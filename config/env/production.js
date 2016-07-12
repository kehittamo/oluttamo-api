export default {
    env: "production",
    db: process.env.MONGOHQ_URL ? process.env.MONGOHQ_URL : "mongodb://localhost/express-mongoose-es6-rest-api-production",
    port: 3000,
};
