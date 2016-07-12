"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var db = process.env.MONGOHQ_URL ? process.env.MONGOHQ_URL : "mongodb://localhost/express-mongoose-es6-rest-api-production";
var port = process.env.PORT ? process.env.PORT : 3000;
exports.default = {
    env: "production",
    db: db,
    port: port
};
module.exports = exports["default"];
//# sourceMappingURL=production.js.map
