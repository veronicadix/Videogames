const { Router } = require("express");
const videogamesRoutes = require("./Videogames");
const genresRoutes = require("./Genres");
const router = Router();

router.use("/", videogamesRoutes);
router.use("/", genresRoutes);

module.exports = router;
