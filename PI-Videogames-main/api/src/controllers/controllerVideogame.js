const { Videogame, Genre, Op } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { loadDb } = require("../loadDb");
const { v4: uuidv4 } = require("uuid");

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: [Genre],
  });
};

const getAllVideogames = async () => {
  const dbInfo = await getDbInfo();
  if (!dbInfo.length) {
    await loadDb();
    return await getDbInfo();
  }
  return dbInfo;
};

// const getVideogame = async (id) => {
//   const dbInfo = await getDbInfo();
//   if (!dbInfo.length) {
//     await loadDb();
//     return await getDbInfo();
//   }
//   return dbInfo.find((e) => e.id === id);
// }

const getVideogames = async (req, res) => {
  let videogames = await getAllVideogames(); //Deposita todo los datos de la db;
  try {
    // console.log(videogames.gId);
    videogames.length
      ? res.status(200).json(videogames)
      : res.status(404).send("Not found... ):");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getVideogameById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.length < 10) {
      const game = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      return res.json(game.data);
    } else {
      const dbGame = await Videogame.findOne({
        where: {
          id: id,
        },
        include: [Genre],
      });
      console.log(dbGame.data);
      return res.json(dbGame);
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

const getVideogameByName = async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const videogamesDb = getAllVideogames();
      const videogamesDbName = await videogamesDb.includes(name);
      // const videogamesDbName = await videogamesDb.filter((e) => e.name === name);
      // const videogamesDb = getAllVideogames()
      // const videogamesDbName = videogamesDb.filter(e => e.name.toLowerCase() === name.toLowerCase())
      const videogamesApiName = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
      );
      const videogamesApiNameData = videogamesApiName.data.results;
      if (videogamesApiNameData.length) {
        const apiGames = videogamesApiNameData.slice(0, 15).map((mp) => {
          return {
            id: mp.id,
            name: mp.name,
            description: mp.description,
            platform: mp.platforms.map((e) => e.platform.name),
            img: mp.background_image,
            rating: mp.rating,
            released: mp.released,
            gId: mp.genres.map((e) => e.name),
          };
        });
        if (videogamesDbName.length) {
          const games = apiGames.concat(videogamesDbName);
          res.status(200).json(games);
        }
        // console.log(apiGames);
        // if(videogamesDbName) {
        //   const gamesByName = videogamesDbName.concat(apiGames)
        //   res.status(200).json(gamesByName)
        // }
        res.status(200).json(apiGames);
      } else res.status(404).send("Not found... ):");
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

/**
 *
 * @param {obj} req
 * @param {obj} res
 */
const addVideogame = async (req, res) => {
  let { name, description, released, rating, platform, gId } = req.body;
  const id = uuidv4();
  try {
    if (!name || !description || !released || !rating || !platform || !gId)
      return res.status(404).send("Please complete all fields.");
    if (rating > 5 || rating < 0)
      return res
        .status(404)
        .send("Rating is not valid. Must be between 0 and 5.");

    const validateVideogame = await Videogame.findOne({
      where: {
        name: name,
      },
    });

    if (validateVideogame) {
      return res.status(404).send("This Videogame already exist.");
    } else {
      let createVideogame = await Videogame.create({
        id,
        img,
        name,
        description,
        released,
        rating,
        platform,
        gId,
        createdInDb: true,
      });

      let DbGenre = await Genre.findAll({
        where: { name: gId },
      });
      // console.log(DbGenre)
      createVideogame.addGenres(DbGenre);

      res.status(200).send(createVideogame);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const validate = async (req, res) => {
  const { name } = req.body;
  const validateVideogame = await Videogame.findOne({
    where: {
      name: name,
    },
  });
  if (validateVideogame) return res.send(true);
};

module.exports = {
  getVideogames,
  getVideogameById,
  getVideogameByName,
  addVideogame,
  validate,
};
