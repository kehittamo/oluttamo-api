const mongoUrl = process.env.MONGOHQ_URL ? process.env.MONGOHQ_URL : "mongodb://localhost/express-mongoose-es6-rest-api-production";

export default {
    env: "production",
    db: mongoUrl,
    port: 3000,
};
