import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";

/**
 * Beer Schema
 */
const BeerSchema = new mongoose.Schema({
    breweryName: {
        type: String,
        required: true,
    },
    beerName: {
        type: String,
        required: true,
    },
    beerFullName: {
        type: String,
        required: true,
        index: true,
    },
    ratebeerId: {
        type: Number,
        required: true,
        index: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create text index to beerFullName
BeerSchema.index({ beerFullName: "text" });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
BeerSchema.method({
});

/**
 * Statics
 */
BeerSchema.statics = {
  /**
   * Get beer
   * @param {ratebeerId} id - The ratebeerId of beer.
   * @returns {Promise<Beer, APIError>}
   */
    get(id) {
        return this.find({ ratebeerId: id })
          .limit(1)
          .execAsync()
          .then((beer) => {
              if (beer.length === 1) {
                  return beer[0];
              }
              const err = new APIError("No such beer exists!", httpStatus.NOT_FOUND);
              return Promise.reject(err);
          });
    },

  /**
   * List beers in descending order of "createdAt" timestamp.
   * @param {number} skip - Number of beers to be skipped.
   * @param {number} limit - Limit number of beers to be returned.
   * @returns {Promise<Beer[]>}
   */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
      .sort({ createdAt: -1 })
      .skip(parseInt(skip, 10))
      .limit(parseInt(limit, 10))
      .execAsync();
    },
};

/**
 * @typedef Beer
 */
export default mongoose.model("Beer", BeerSchema);
