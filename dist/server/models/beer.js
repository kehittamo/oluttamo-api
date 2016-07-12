"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require("http-status");

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require("../helpers/APIError");

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Beer Schema
 */
var BeerSchema = new _mongoose2.default.Schema({
    breweryName: {
        type: String,
        required: true
    },
    beerName: {
        type: String,
        required: true
    },
    beerFullName: {
        type: String,
        required: true,
        index: true
    },
    ratebeerId: {
        type: String,
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
BeerSchema.method({});

/**
 * Statics
 */
BeerSchema.statics = {
    /**
     * Get beer
     * @param {ratebeerId} id - The ratebeerId of beer.
     * @returns {Promise<Beer, APIError>}
     */

    get: function get(id) {
        return this.find({ ratebeerId: id }).limit(1).execAsync().then(function (beer) {
            if (beer.length === 1) {
                return beer[0];
            }
            var err = new _APIError2.default("No such beer exists!", _httpStatus2.default.NOT_FOUND);
            return _bluebird2.default.reject(err);
        });
    },


    /**
     * List beers in descending order of "createdAt" timestamp.
     * @param {number} skip - Number of beers to be skipped.
     * @param {number} limit - Limit number of beers to be returned.
     * @returns {Promise<Beer[]>}
     */
    list: function list() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var _ref$skip = _ref.skip;
        var skip = _ref$skip === undefined ? 0 : _ref$skip;
        var _ref$limit = _ref.limit;
        var limit = _ref$limit === undefined ? 50 : _ref$limit;

        return this.find().sort({ createdAt: -1 }).skip(parseInt(skip, 10)).limit(parseInt(limit, 10)).execAsync();
    }
};

/**
 * @typedef Beer
 */
exports.default = _mongoose2.default.model("Beer", BeerSchema);
module.exports = exports["default"];
//# sourceMappingURL=beer.js.map
