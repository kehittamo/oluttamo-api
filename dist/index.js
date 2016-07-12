"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _pm = require("pm2");

var _pm2 = _interopRequireDefault(_pm);

var _env = require("./config/env");

var _env2 = _interopRequireDefault(_env);

var _express = require("./config/express");

var _express2 = _interopRequireDefault(_express);

var _cronJobs = require("./server/helpers/cronJobs");

var _cronJobs2 = _interopRequireDefault(_cronJobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// promisify mongoose
_bluebird2.default.promisifyAll(_mongoose2.default);

// connect to mongo db
_mongoose2.default.connect(_env2.default.db, { server: { socketOptions: { keepAlive: 1 } } });
_mongoose2.default.connection.on("error", function () {
    throw new Error("unable to connect to database: " + _env2.default.db);
});

var debug = require("debug")("express-mongoose-es6-rest-api:index");
if (process.env.NODE_ENV === "production") {
    (function () {
        var instances = process.env.WEB_CONCURRENCY || -1; // Set by Heroku or -1 to scale to max cpu core -1
        var maxMemory = process.env.WEB_MEMORY || 256;

        _pm2.default.connect(function () {
            _pm2.default.start({
                script: "./dist/index.js",
                name: "oluttamo",
                exec_mode: "fork",
                instances: instances,
                max_memory_restart: maxMemory
            }, function (err) {
                if (err) return console.error("Error while launching applications", err.stack || err);
                console.log("PM2 and application has been succesfully started");
                // Display logs in standard output
                _pm2.default.launchBus(function (launchBusErr, bus) {
                    if (launchBusErr) console.error(launchBusErr);
                    console.log("[PM2] Log streaming started");

                    bus.on("log:out", function (packet) {
                        console.log("[App:%s] %s", packet.process.name, packet.data);
                    });
                    bus.on("log:err", function (packet) {
                        console.error("[App:%s][Err] %s", packet.process.name, packet.data);
                    });
                });
                return true;
            });
        });
    })();
} else {
    // listen on port config.port
    _express2.default.listen(_env2.default.port, function () {
        debug("server started on port " + _env2.default.port + " (" + _env2.default.env + ")");
    });
}
// Start cronjobs
(0, _cronJobs2.default)();

exports.default = _express2.default;
module.exports = exports["default"];
//# sourceMappingURL=index.js.map
