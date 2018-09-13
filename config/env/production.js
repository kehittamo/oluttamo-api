const db = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb://localhost/express-mongoose-es6-rest-api-production";
const port = process.env.PORT ? process.env.PORT : 3000;
export default {
    env: "production",
    db,
    port,
};
