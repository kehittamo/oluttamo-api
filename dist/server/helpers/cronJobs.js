"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeCron = require("node-cron");

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _downloadBeerData = require("./downloadBeerData");

var _downloadBeerData2 = _interopRequireDefault(_downloadBeerData);

var _unzipBeerData = require("./unzipBeerData");

var _unzipBeerData2 = _interopRequireDefault(_unzipBeerData);

var _parseBeerData = require("./parseBeerData");

var _parseBeerData2 = _interopRequireDefault(_parseBeerData);

var _constants = require("../../constants");

var _beer = require("../controllers/beer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Start ratebeer cronjob
 * 1. Download beers.zip from ratebeer
 * 2. Unzip beers.zip -> beers.txt
 * 3. Loop thru beers.txt file and save beers to db
 */
function startBeerTasks() {
    // # ┌────────────── second (optional)
    // # │ ┌──────────── minute
    // # │ │ ┌────────── hour
    // # │ │ │ ┌──────── day of month
    // # │ │ │ │ ┌────── month
    // # │ │ │ │ │ ┌──── day of week
    // # │ │ │ │ │ │
    // # │ │ │ │ │ │
    // # * * * * * *
    // Run cronjob every sunday at 6:00 am
    _nodeCron2.default.schedule("0 30 22 * * 2", function () {
        (0, _beer.countBeers)().then(function (result) {
            var beerCount = result;
            (0, _mkdirp2.default)(_constants.BEER_DATA_FOLDER, function (mkdirErr) {
                if (mkdirErr) console.error(mkdirErr);else {
                    var download = (0, _downloadBeerData2.default)();
                    download.on("error", function (err) {
                        console.error("err: ", err);
                    });
                    download.on("end", function () {
                        (0, _unzipBeerData2.default)(function (success) {
                            if (success) {
                                // We need little timeout because beers.txt file is not readable immediately
                                setTimeout(function () {
                                    (0, _parseBeerData2.default)(beerCount);
                                }, 1000);
                            }
                        });
                    });
                    // download.on("start", (fileSize) => {
                    //     console.log("fileSize: ", fileSize);
                    // });
                    // download.on("progress", (progress) => {
                    //     console.log("progress: ", progress);
                    // });
                }
            });
        }).catch(function (error) {
            console.error("startBeerTasks error: ", error);
        });
    });
}

exports.default = startBeerTasks;
module.exports = exports["default"];
//# sourceMappingURL=cronJobs.js.map
