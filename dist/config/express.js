"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _methodOverride = require("method-override");

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _httpStatus = require("http-status");

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _expressWinston = require("express-winston");

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _expressValidation = require("express-validation");

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _winston = require("./winston");

var _winston2 = _interopRequireDefault(_winston);

var _routes = require("../server/routes");

var _routes2 = _interopRequireDefault(_routes);

var _env = require("./env");

var _env2 = _interopRequireDefault(_env);

var _APIError = require("../server/helpers/APIError");

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

if (_env2.default.env === "development") {
    app.use((0, _morgan2.default)("dev"));
}

// parse body params and attache them to req.body
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use((0, _cookieParser2.default)());
app.use((0, _compression2.default)());
app.use((0, _methodOverride2.default)());

// disable "X-Powered-By" header in response
app.disable("x-powered-by");

// enable CORS - Cross Origin Resource Sharing
app.use((0, _cors2.default)());

// enable detailed API logging in dev env and basic info otherwise
if (_env2.default.env === "development") {
    _expressWinston2.default.requestWhitelist.push("body");
    _expressWinston2.default.responseWhitelist.push("body");
    app.use(_expressWinston2.default.logger({
        winstonInstance: _winston2.default,
        meta: true, // optional: log meta data about request (defaults to true)
        msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
        colorStatus: true }));
} else {
    app.use(_expressWinston2.default.logger({
        winstonInstance: _winston2.default,
        meta: false, // optional: log meta data about request (defaults to true)
        msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms"
    }));
}

app.use(_express2.default.static("public"));
app.get("/", function (req, res) {
    res.sendFile("index.html");
});
// mount all routes on /api path
app.use("/api", _routes2.default);

// if error is not an instanceOf APIError, convert it.
app.use(function (err, req, res, next) {
    if (err instanceof _expressValidation2.default.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        var unifiedErrorMessage = err.errors.map(function (error) {
            return error.messages.join(". ");
        }).join(" and ");
        var error = new _APIError2.default(unifiedErrorMessage, err.status, true);
        return next(error);
    } else if (!(err instanceof _APIError2.default)) {
        var apiError = new _APIError2.default(err.message, err.status, err.isPublic);
        return next(apiError);
    }
    return next(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new _APIError2.default("API not found", _httpStatus2.default.NOT_FOUND);
    return next(err);
});

// log error in winston transports except when executing test suite
if (_env2.default.env !== "test") {
    app.use(_expressWinston2.default.errorLogger({
        winstonInstance: _winston2.default
    }));
}

// error handler, send stacktrace only during development
app.use(function (err, req, res, next) {
    return (// eslint-disable-line no-unused-vars
        res.status(err.status).json({
            message: err.isPublic ? err.message : _httpStatus2.default[err.status],
            stack: _env2.default.env === "development" ? err.stack : {}
        })
    );
});

exports.default = app;
module.exports = exports["default"];
//# sourceMappingURL=express.js.map
