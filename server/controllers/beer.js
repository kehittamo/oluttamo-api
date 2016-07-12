import Beer from "../models/beer";

/**
 * Load beer and append to req.
 */
function load(req, res, next, id) {
    Beer.get(id).then((beer) => {
        req.beer = beer;        // eslint-disable-line no-param-reassign
        return next();
    }).error((e) => next(e));
}

/**
 * Search beer and append to req.
 */
function searchBeer(req, res, next, q) {
    const query = new RegExp(`^${q.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")}`, "i");
    Beer.find({ beerFullName: query })
    .limit(50)
    .execAsync()
    .then((beer) => {
        req.beer = beer;        // eslint-disable-line no-param-reassign
        return next();
    })
    .catch((e) => next(e));
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
    return Beer.countAsync();
}

/**
 * Create new beer
 * @property {object} data includes all data (beerFullName, breweryName, beerName, ratebeerId)
 * @property {function} cb callback function
 * @returns {Beer}
 */
function create(data, cb) {
    const beer = new Beer({
        beerFullName: data.beerFullName,
        breweryName: data.breweryName,
        beerName: data.beerName,
        ratebeerId: data.ratebeerId,
    });

    beer.saveAsync()
        .then((savedBeer) => cb(false, savedBeer))
        .catch((e) => cb(e, null));
}

/**
 * Update existing beer
 * @property {object} data includes all data (beerFullName, breweryName, beerName, ratebeerId)
 * @property {function} cb callback function
 * @returns {Beer}
 */
function update(data, cb) {
    const beer = {
        beerFullName: data.beerFullName,
        breweryName: data.breweryName,
        beerName: data.beerName,
        ratebeerId: data.ratebeerId,
    };

    Beer.findOneAndUpdateAsync(
      { ratebeerId: data.ratebeerId },
      { $set: beer },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    .then((savedBeer) => cb(false, savedBeer))
    .error((e) => cb(e, null));
}

/**
 * Create new beer via form
 * @property {object} data includes all data (beerFullName, breweryName, beerName, ratebeerId)
 * @returns {Beer}
 */
function createFromForm(req, res, next) {
    console.log(req.body);
    const beer = new Beer({
        beerFullName: req.body.beerFullName,
        breweryName: req.body.breweryName,
        beerName: req.body.beerName,
        ratebeerId: req.body.ratebeerId,
    });

    beer.saveAsync()
        .then((savedBeer) => res.json(savedBeer))
        .error((e) => next(e));
}

/**
 * Update existing beer via form
 * @property {object} data includes all data (beerFullName, breweryName, beerName, ratebeerId)
 * @returns {Beer}
 */
function updateFromForm(req, res, next) {
    const beer = req.beer;
    beer.beerFullName = `${req.body.breweryName} ${req.body.beerName}`;
    beer.breweryName = req.body.breweryName;
    beer.beerName = req.body.beerName;
    beer.ratebeerId = req.body.ratebeerId;

    beer.saveAsync()
        .then((savedBeer) => res.json(savedBeer))
        .error((e) => next(e));
}

/**
 * Get beer list.
 * @property {number} req.query.skip - Number of beers to be skipped.
 * @property {number} req.query.limit - Limit number of beers to be returned.
 * @returns {Beer[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Beer.list({ limit, skip }).then((beers) => res.json(beers))
        .error((e) => next(e));
}

/**
 * Delete beer.
 * @returns {Beer}
 */
function remove(req, res, next) {
    const beer = req.beer;
    beer.removeAsync()
        .then((deletedBeer) => res.json(deletedBeer))
        .error((e) => next(e));
}

export default { load, get, create, update, list, remove, countBeers, searchBeer, getSearchResults, createFromForm, updateFromForm };
