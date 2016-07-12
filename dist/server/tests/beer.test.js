"use strict";

var _supertestAsPromised = require("supertest-as-promised");

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require("http-status");

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _index = require("../../index");

var _index2 = _interopRequireDefault(_index);

var _beer = require("../models/beer");

var _beer2 = _interopRequireDefault(_beer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

describe("## Beer APIs", function () {
	// Clear collection before start tests
	_beer2.default.remove().exec();

	var beer = {
		beerFullName: "Sori Brewing Sori Brewing OoO Session IPA (2nd Edition)",
		breweryName: "Sori Brewing",
		beerName: "Sori Brewing OoO Session IPA (2nd Edition)",
		ratebeerId: "280436"
	};

	describe("# POST /api/beers", function () {
		it("should create a new beer", function (done) {
			(0, _supertestAsPromised2.default)(_index2.default).post("/api/beers").send(beer).expect(_httpStatus2.default.OK).then(function (res) {
				(0, _chai.expect)(res.body.beerFullName).to.equal(beer.beerFullName);
				(0, _chai.expect)(res.body.breweryName).to.equal(beer.breweryName);
				(0, _chai.expect)(res.body.beerName).to.equal(beer.beerName);
				(0, _chai.expect)(res.body.ratebeerId).to.equal(beer.ratebeerId);
				beer = res.body;
				done();
			});
		});
	});

	describe("# GET /api/beers/:beerId", function () {
		it("should get beer details", function (done) {
			(0, _supertestAsPromised2.default)(_index2.default).get("/api/beers/" + beer.ratebeerId).expect(_httpStatus2.default.OK).then(function (res) {
				(0, _chai.expect)(res.body.beerFullName).to.equal(beer.beerFullName);
				(0, _chai.expect)(res.body.breweryName).to.equal(beer.breweryName);
				(0, _chai.expect)(res.body.beerName).to.equal(beer.beerName);
				(0, _chai.expect)(res.body.ratebeerId).to.equal(beer.ratebeerId);
				done();
			});
		});

		it("should report error with message - Not found, when beer does not exists", function (done) {
			(0, _supertestAsPromised2.default)(_index2.default).get("/api/beers/56c787ccc67fc16ccc1a5e92").expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
				(0, _chai.expect)(res.body.message).to.equal("Not Found");
				done();
			});
		});
	});

	describe("# PUT /api/beers/:beerId", function () {
		it("should update beer details", function (done) {
			beer.beerName = "Sori Brewing OoO Session IPA (1st Edition)";
			(0, _supertestAsPromised2.default)(_index2.default).put("/api/beers/" + beer.ratebeerId).send(beer).expect(_httpStatus2.default.OK).then(function (res) {
				(0, _chai.expect)(res.body.beerFullName).to.equal(beer.breweryName + " " + beer.beerName);
				(0, _chai.expect)(res.body.breweryName).to.equal(beer.breweryName);
				(0, _chai.expect)(res.body.beerName).to.equal("Sori Brewing OoO Session IPA (1st Edition)");
				(0, _chai.expect)(res.body.ratebeerId).to.equal(beer.ratebeerId);
				done();
			});
		});
	});

	describe("# GET /api/beers/", function () {
		it("should get all beers", function (done) {
			(0, _supertestAsPromised2.default)(_index2.default).get("/api/beers").expect(_httpStatus2.default.OK).then(function (res) {
				(0, _chai.expect)(res.body).to.be.an("array");
				done();
			});
		});
	});

	// describe("# DELETE /api/beers/", () => {
	// 	it("should delete beer", (done) => {
	// 		request(app)
	// 			.delete(`/api/beers/${beer._id}`)
	// 			.expect(httpStatus.OK)
	// 			.then(res => {
	// 				expect(res.body.beername).to.equal("KK");
	// 				expect(res.body.mobileNumber).to.equal(beer.mobileNumber);
	// 				done();
	// 			});
	// 	});
	// });
});
//# sourceMappingURL=beer.test.js.map
