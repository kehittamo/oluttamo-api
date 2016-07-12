import express from "express";
import beerCtrl from "../controllers/beer";

const router = express.Router();	// eslint-disable-line new-cap

// Redirect direct /api/search -call to /-root
router.get("/", (req, res) => {
    res.redirect("/");
});

// Search
router.route("/:search")
	/** GET /api/:search - Get beer search results */
	.get(beerCtrl.getSearchResults);

/** Load beer when API with beerId route parameter is hit */
router.param("search", beerCtrl.searchBeer);

export default router;
