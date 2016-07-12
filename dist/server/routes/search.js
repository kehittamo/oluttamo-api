"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _beer = require("../controllers/beer");

var _beer2 = _interopRequireDefault(_beer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

// Redirect direct /api/search -call to /-root
router.get("/", function (req, res) {
	res.redirect("/");
});

// Search
router.route("/:search")
/** GET /api/:search - Get beer search results */
.get(_beer2.default.getSearchResults);

/** Load beer when API with beerId route parameter is hit */
router.param("search", _beer2.default.searchBeer);

exports.default = router;
module.exports = exports["default"];
//# sourceMappingURL=search.js.map
