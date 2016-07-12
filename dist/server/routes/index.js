"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _beer = require("./beer");

var _beer2 = _interopRequireDefault(_beer);

var _search = require("./search");

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", function (req, res) {
  return res.send("OK");
});
// mount beer routes at /beers
router.use("/beers", _beer2.default);
router.use("/search", _search2.default);
// Redirect direct /api -call to /-root
router.get("/", function (req, res) {
  res.redirect("/");
});

exports.default = router;
module.exports = exports["default"];
//# sourceMappingURL=index.js.map
