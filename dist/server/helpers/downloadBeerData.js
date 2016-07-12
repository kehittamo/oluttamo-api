"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wgetImproved = require("wget-improved");

var _wgetImproved2 = _interopRequireDefault(_wgetImproved);

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function downloadBeerData() {
    return _wgetImproved2.default.download("" + _constants.BEER_ZIP_URL, "" + _constants.BEER_DATA_FOLDER + _constants.BEER_ZIP_FILE_NAME, {});
}

exports.default = downloadBeerData;
module.exports = exports["default"];
//# sourceMappingURL=downloadBeerData.js.map
