const { Router } = require("express");
const router = Router();
const {
  getVideogames,
  getVideogameByName,
  getVideogameById,
  addVideogame,
  validate,
} = require("../controllers/controllerVideogame");

router.get("/", getVideogames);
router.get("/videogames:name?", getVideogameByName);
router.get("/videogames/:id", getVideogameById);
router.post("/new", addVideogame);
router.use("/validate", validate);


module.exports = router;