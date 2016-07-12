import express from "express";
import beerRoutes from "./beer";
import searchRoutes from "./search";

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) =>
	res.send("OK")
);
// mount beer routes at /beers
router.use("/beers", beerRoutes);
router.use("/search", searchRoutes);
// Redirect direct /api -call to /-root
router.get("/", (req, res) => {
    res.redirect("/");
});

export default router;
