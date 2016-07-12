"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/hapijs/joi/blob/v9.0.0/API.md
var createBeer = {
    breweryName: _joi2.default.string().required(),
    beerName: _joi2.default.string().required(),
    beerFullName: _joi2.default.string().required(),
    ratebeerId: _joi2.default.number().required()
};

function validateCreateBeer(data) {
    return _joi2.default.validate(data, createBeer);
}
var updateBeer = {
    breweryName: _joi2.default.string().required(),
    beerName: _joi2.default.string().required(),
    beerFullName: _joi2.default.string().required(),
    ratebeerId: _joi2.default.number().required()
};
function validateUpdateBeer(data) {
    return _joi2.default.validate(data, updateBeer);
}

exports.default = { validateCreateBeer: validateCreateBeer, validateUpdateBeer: validateUpdateBeer };
module.exports = exports["default"];
//# sourceMappingURL=beerDataValidator.js.map
