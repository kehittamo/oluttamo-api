import request from "supertest-as-promised";
import httpStatus from "http-status";
import chai from "chai";
import { expect } from "chai";
import app from "../../index";
import Beer from "../models/beer";

chai.config.includeStack = true;

describe("## Beer APIs", () => {
  // Clear collection before start tests
  Beer.remove().exec();

	let beer = {
    beerFullName: "Sori Brewing Sori Brewing OoO Session IPA (2nd Edition)",
    breweryName: "Sori Brewing",
    beerName: "Sori Brewing OoO Session IPA (2nd Edition)",
    ratebeerId: "280436",
	};

	describe("# POST /api/beers", () => {
		it("should create a new beer", (done) => {
			request(app)
				.post("/api/beers")
				.send(beer)
				.expect(httpStatus.OK)
				.then(res => {
          expect(res.body.beerFullName).to.equal(beer.beerFullName);
          expect(res.body.breweryName).to.equal(beer.breweryName);
          expect(res.body.beerName).to.equal(beer.beerName);
					expect(res.body.ratebeerId).to.equal(beer.ratebeerId);
					beer = res.body;
					done();
				});
		});
	});

	describe("# GET /api/beers/:beerId", () => {
		it("should get beer details", (done) => {
			request(app)
				.get(`/api/beers/${beer.ratebeerId}`)
				.expect(httpStatus.OK)
				.then(res => {
          expect(res.body.beerFullName).to.equal(beer.beerFullName);
          expect(res.body.breweryName).to.equal(beer.breweryName);
          expect(res.body.beerName).to.equal(beer.beerName);
					expect(res.body.ratebeerId).to.equal(beer.ratebeerId);
					done();
				});
		});

		it("should report error with message - Not found, when beer does not exists", (done) => {
			request(app)
				.get("/api/beers/56c787ccc67fc16ccc1a5e92")
				.expect(httpStatus.NOT_FOUND)
				.then(res => {
					expect(res.body.message).to.equal("Not Found");
					done();
				});
		});
	});

	describe("# PUT /api/beers/:beerId", () => {
		it("should update beer details", (done) => {
			beer.beerName = "Sori Brewing OoO Session IPA (1st Edition)";
			request(app)
				.put(`/api/beers/${beer.ratebeerId}`)
				.send(beer)
				.expect(httpStatus.OK)
				.then(res => {
          expect(res.body.beerFullName).to.equal(`${beer.breweryName} ${beer.beerName}`);
          expect(res.body.breweryName).to.equal(beer.breweryName);
					expect(res.body.beerName).to.equal("Sori Brewing OoO Session IPA (1st Edition)");
					expect(res.body.ratebeerId).to.equal(beer.ratebeerId);
					done();
				});
		});
	});

	describe("# GET /api/beers/", () => {
		it("should get all beers", (done) => {
			request(app)
				.get("/api/beers")
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body).to.be.an("array");
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
