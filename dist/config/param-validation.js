"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /api/beers
    createBeer: {
        body: {
            breweryName: _joi2.default.string().required(),
            beerName: _joi2.default.string().required(),
            beerFullName: _joi2.default.string().required(),
            ratebeerId: _joi2.default.number().required()
        }
    },

    // UPDATE /api/beers/:beerId
    updateBeer: {
        body: {
            breweryName: _joi2.default.string().required(),
            beerName: _joi2.default.string().required(),
            beerFullName: _joi2.default.string().required(),
            ratebeerId: _joi2.default.number().required()
        },
        params: {
            beerId: _joi2.default.string().required()
        }
    }
};
module.exports = exports["default"];
//# sourceMappingURL=param-validation.js.map
