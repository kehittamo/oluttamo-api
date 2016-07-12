"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _beer = require("../models/beer");

var _beer2 = _interopRequireDefault(_beer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load beer and append to req.
 */
function load(req, res, next, id) {
    _beer2.default.get(id).then(function (beer) {
        req.beer = beer; // eslint-disable-line no-param-reassign
        return next();
    }).error(function (e) {
        return next(e);
    });
}

/**
 * Search beer and append to req.
 */
function searchBeer(req, res, next, q) {
    var query = new RegExp("^" + q.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "i");
    _beer2.default.find({ beerFullName: query }).limit(50).execAsync().then(function (beer) {
        req.beer = beer; // eslint-disable-line no-param-reassign
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
 * Get beer
 * @returns {Beer}
 */
function get(req, res) {
    return res.json(req.beer);
}

/**
 * Get Beer Search results
 * @returns {Beer(s)}
 */
function getSearchResults(req, res) {
    if (req.query.callback) {
        return res.jsonp(req.beer);
    }
    return res.json(req.beer);
}
/**
 * Get beer count
 * @returns {Promise<BeerCount[]>}
 */
function countBeers() {
    return _beer2.default.countAsync();
}

/**
 * Create new beer
 * @property {object} data includes all data (beerFullName, breweryName, beerName, ratebeerId)
 * @property {function} cb callback function
 * @returns {Beer}
 */
function create(data, cb) {
    var beer = new _beer2.default({
        beerFullName: data.beerFullName,
        breweryName: data.breweryName,
        beerName: data.beerName,
        ratebeerId: data.ratebeerId
    });

    beer.saveAsync().then(function (savedBeer) {
        return cb(false, savedBeer);
    }).catch(function (e) {
        return cb(e, null);
    });
}

/**
 * Update existing beer
 * @property {object} data includes all data (beerFullName, breweryName, beerName, ratebeerId)
 * @property {function} cb callback function
 * @returns {Beer}
 */
function update(data, cb) {
    var beer = {
        beerFullName: data.beerFullName,
        breweryName: data.breweryName,
        beerName: data.beerName,
        ratebeerId: data.ratebeerId
    };

    _beer2.default.findOneAndUpdateAsync({ ratebeerId: data.ratebeerId }, { $set: beer }, { upsert: true, new: true, setDefaultsOnInsert: true }).then(function (savedBeer) {
        return cb(false, savedBeer);
    }).error(function (e) {
        return cb(e, null);
    });
}

/**
 * Create new beer via form
 * @property {object} data includes all data (beerFullName, breweryName, beerName, ratebeerId)
 * @returns {Beer}
 */
function createFromForm(req, res, next) {
    console.log(req.body);
    var beer = new _beer2.default({
        beerFullName: req.body.beerFullName,
        breweryName: req.body.breweryName,
        beerName: req.body.beerName,
        ratebeerId: req.body.ratebeerId
    });

    beer.saveAsync().then(function (savedBeer) {
        return res.json(savedBeer);
    }).error(function (e) {
        return next(e);
    });
}

/**
 * Update existing beer via form
 * @property {object} data includes all data (beerFullName, breweryName, beerName, ratebeerId)
 * @returns {Beer}
 */
function updateFromForm(req, res, next) {
    var beer = req.beer;
    beer.beerFullName = req.body.breweryName + " " + req.body.beerName;
    beer.breweryName = req.body.breweryName;
    beer.beerName = req.body.beerName;
    beer.ratebeerId = req.body.ratebeerId;

    beer.saveAsync().then(function (savedBeer) {
        return res.json(savedBeer);
    }).error(function (e) {
        return next(e);
    });
}

/**
 * Get beer list.
 * @property {number} req.query.skip - Number of beers to be skipped.
 * @property {number} req.query.limit - Limit number of beers to be returned.
 * @returns {Beer[]}
 */
function list(req, res, next) {
    var _req$query = req.query;
    var _req$query$limit = _req$query.limit;
    var limit = _req$query$limit === undefined ? 50 : _req$query$limit;
    var _req$query$skip = _req$query.skip;
    var skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    _beer2.default.list({ limit: limit, skip: skip }).then(function (beers) {
        return res.json(beers);
    }).error(function (e) {
        return next(e);
    });
}

/**
 * Delete beer.
 * @returns {Beer}
 */
function remove(req, res, next) {
    var beer = req.beer;
    beer.removeAsync().then(function (deletedBeer) {
        return res.json(deletedBeer);
    }).error(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, countBeers: countBeers, searchBeer: searchBeer, getSearchResults: getSearchResults, createFromForm: createFromForm, updateFromForm: updateFromForm };
module.exports = exports["default"];
//# sourceMappingURL=beer.js.map
