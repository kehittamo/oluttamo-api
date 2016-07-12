"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _unzip = require("unzip");

var _unzip2 = _interopRequireDefault(_unzip);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unzipAction(cb) {
    _fs2.default.createReadStream("" + _constants.BEER_DATA_FOLDER + _constants.BEER_ZIP_FILE_NAME).pipe(_unzip2.default.Parse()) // eslint-disable-line new-cap
    .on("entry", function (entry) {
        var fileName = entry.path;
        if (fileName === _constants.BEER_TXT_FILE_NAME) {
            entry.pipe(_fs2.default.createWriteStream("" + _constants.BEER_DATA_FOLDER + _constants.BEER_TXT_FILE_NAME));
            cb(true);
        } else {
            entry.autodrain();
            cb(false);
        }
    });
}

exports.default = unzipAction;
module.exports = exports["default"];
//# sourceMappingURL=unzipBeerData.js.map
