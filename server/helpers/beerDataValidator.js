import Joi from "joi";

// https://github.com/hapijs/joi/blob/v9.0.0/API.md
const createBeer = {
    breweryName: Joi.string().required(),
    beerName: Joi.string().required(),
    beerFullName: Joi.string().required(),
    ratebeerId: Joi.number().required(),
};

function validateCreateBeer(data) {
    return Joi.validate(data, createBeer);
}
const updateBeer = {
    breweryName: Joi.string().required(),
    beerName: Joi.string().required(),
    beerFullName: Joi.string().required(),
    ratebeerId: Joi.number().required(),
};
function validateUpdateBeer(data) {
    return Joi.validate(data, updateBeer);
}

export default { validateCreateBeer, validateUpdateBeer };
