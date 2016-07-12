"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require("express-validation");

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require("../../config/param-validation");

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _beer = require("../controllers/beer");

var _beer2 = _interopRequireDefault(_beer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route("/")
/** GET /api/beers - Get list of beers */
.get(_beer2.default.list)

/** POST /api/beers - Create new beer */
.post((0, _expressValidation2.default)(_paramValidation2.default.createBeer), _beer2.default.createFromForm);

router.route("/:beerId")
/** GET /api/beers/:beerId - Get beer */
.get(_beer2.default.get)

/** PUT /api/beers/:beerId - Update beer */
.put((0, _expressValidation2.default)(_paramValidation2.default.updateBeer), _beer2.default.updateFromForm);

/** DELETE /api/beers/:beerId - Delete beer */
// .delete(beerCtrl.remove);

/** Load beer when API with beerId route parameter is hit */
router.param("beerId", _beer2.default.load);

exports.default = router;
module.exports = exports["default"];
//# sourceMappingURL=beer.js.map
