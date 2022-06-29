const { Genre, Videogame } = require("../db");
const { loadGenreDb } = require('../loadDb');

const getDbInfo = async () => {
  return await Genre.findAll();
};

const getAllGenres = async () => {
  const dbInfo = await getDbInfo();
  if (!dbInfo.length) {
    await loadGenreDb();
    return await getDbInfo();
  }
  return dbInfo;
};

const getGenres = async (req, res) => {
  let genres = await getAllGenres();
  try {
    genres.length
      ? res.status(200).json(genres)
      : res.status(404).send('Not found... ):');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addGenre = async (req, res) => {
  const {name} = req.body
const newGenre = await Genre.create({
    name: name
  })
  // return newGenre
  console.log(newGenre)

  res.status(200).json(newGenre)

}

module.exports = {
    getGenres,
    addGenre
  };