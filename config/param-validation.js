import Joi from "joi";

export default {
    // POST /api/beers
    createBeer: {
        body: {
            breweryName: Joi.string().required(),
            beerName: Joi.string().required(),
            beerFullName: Joi.string().required(),
            ratebeerId: Joi.number().required(),
        },
    },

    // UPDATE /api/beers/:beerId
    updateBeer: {
        body: {
            breweryName: Joi.string().required(),
            beerName: Joi.string().required(),
            beerFullName: Joi.string().required(),
            ratebeerId: Joi.number().required(),
        },
        params: {
            beerId: Joi.string().required(),
        },
    },
};
