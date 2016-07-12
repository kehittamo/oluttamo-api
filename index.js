import Promise from "bluebird";
import mongoose from "mongoose";
import pm2 from "pm2";
import config from "./config/env";
import app from "./config/express";
import startCron from "./server/helpers/cronJobs";

// promisify mongoose
Promise.promisifyAll(mongoose);

// connect to mongo db
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database: ${config.db}`);
});

const debug = require("debug")("express-mongoose-es6-rest-api:index");
if (process.env.NODE_ENV === "production") {
    const instances = process.env.WEB_CONCURRENCY || -1; // Set by Heroku or -1 to scale to max cpu core -1
    const maxMemory = process.env.WEB_MEMORY || 256;

    pm2.connect(() => {
        pm2.start({
            script: "./dist/index.js",
            name: "oluttamo",
            exec_mode: "fork",
            instances,
            max_memory_restart: maxMemory,
        }, (err) => {
            if (err) return console.error("Error while launching applications", err.stack || err);
            console.log("PM2 and application has been succesfully started");
            // Display logs in standard output
            pm2.launchBus((launchBusErr, bus) => {
                if (launchBusErr) console.error(launchBusErr);
                console.log("[PM2] Log streaming started");

                bus.on("log:out", (packet) => {
                    console.log("[App:%s] %s", packet.process.name, packet.data);
                });
                bus.on("log:err", (packet) => {
                    console.error("[App:%s][Err] %s", packet.process.name, packet.data);
                });
            });
            return true;
        });
    });
} else {
    // listen on port config.port
    app.listen(config.port, () => {
        debug(`server started on port ${config.port} (${config.env})`);
    });
}
// Start cronjobs
startCron();

export default app;
