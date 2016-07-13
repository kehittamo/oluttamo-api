"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _readline = require("readline");

var _readline2 = _interopRequireDefault(_readline);

var _htmlEntities = require("html-entities");

var _beerDataValidator = require("./beerDataValidator");

var _beer = require("../controllers/beer");

var _beer2 = _interopRequireDefault(_beer);

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Heavily influenced by https://github.com/harrisiirak/ratebeer-open-data


var count = 0;
var range = [0, 10000];
var searchCollection = [];

function escapeBeerName(name) {
    return _htmlEntities.XmlEntities.decode(name).replace(/\0/g, "").trim();
}

function createBeer(beerCount, beerData) {
    if (beerCount > 0) {
        _beer2.default.update(beerData, function (error, result) {
            if (error) console.error("update beer error: ", error);else console.log("Result: ", result);
        });
    } else {
        _beer2.default.create(beerData, function (error, result) {
            if (error) console.error("create beer error: ", error);else console.log("Result: ", result);
        });
    }
}

function parseData(beerCount) {
    var reader = _readline2.default.createInterface({
        input: _fs2.default.createReadStream("" + _constants.BEER_DATA_FOLDER + _constants.BEER_TXT_FILE_NAME, { encoding: "utf-16le" })
    });

    reader.on("line", function (line) {
        // Only process valid records
        var details = line.split("\t");
        if (details.length < 6) {
            return;
        }
        count++;

        // If range is enabled
        if (range && range.length && (count < range[0] || count > range[1])) {
            if (count > range[1]) {
                reader.close();
            }

            return;
        }

        var beerName = escapeBeerName(details[1]);
        var breweryName = escapeBeerName(details[3]);
        var beerFullName = breweryName + " " + beerName;
        searchCollection.push({
            ratebeerId: +details[0],
            beerName: beerName,
            breweryName: breweryName,
            beerFullName: beerFullName
        });
    });

    reader.on("close", function () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = searchCollection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var beerData = _step.value;

                var validationData = (0, _beerDataValidator.validateCreateBeer)(beerData);
                if (validationData.error === null) {
                    createBeer(beerCount, beerData);
                } else {
                    console.error(beerData.beername, " validation error: ", validationData.error);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    });
}

exports.default = parseData;
module.exports = exports["default"];
//# sourceMappingURL=parseBeerData.js.map
