import express from "express";
import validate from "express-validation";
import paramValidation from "../../config/param-validation";
import beerCtrl from "../controllers/beer";
import { validateRequest } from "../helpers/authenticationValidator";

const router = express.Router();	// eslint-disable-line new-cap

router.use((req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
        validateRequest(req)
        .then(() => {
            next();
        })
        .catch((err) => {
            res.status(401);
            res.json({ error: err });
        });
    } else {
        next();
    }
});

router.route("/")
	/** GET /api/beers - Get list of beers */
	.get(beerCtrl.list)

	/** POST /api/beers - Create new beer */
	.post(validate(paramValidation.createBeer), beerCtrl.createFromForm);

router.route("/:beerId")
	/** GET /api/beers/:beerId - Get beer */
	.get(beerCtrl.get)

	/** PUT /api/beers/:beerId - Update beer */
	.put(validate(paramValidation.updateBeer), beerCtrl.updateFromForm);

	/** DELETE /api/beers/:beerId - Delete beer */
	// .delete(beerCtrl.remove);

/** Load beer when API with beerId route parameter is hit */
router.param("beerId", beerCtrl.load);

export default router;
