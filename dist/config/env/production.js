"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    env: "production",
    db: process.env.MONGOHQ_URL ? process.env.MONGOHQ_URL : "mongodb://localhost/express-mongoose-es6-rest-api-production",
    port: 3000
};
module.exports = exports["default"];
//# sourceMappingURL=production.js.map
