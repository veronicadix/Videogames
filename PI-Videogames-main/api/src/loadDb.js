const axios = require("axios");
const { Videogame, Genre } = require("./db");
const { API_KEY } = process.env;

const apiUrl1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
const apiUrl2 = axios.get(
  `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
);
const apiUrl3 = axios.get(
  `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
);
const apiUrl4 = axios.get(
  `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
);
const apiUrl5 = axios.get(
  `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
);

const getApiInfo = async () => {
  var games = [];
  // console.log("1", data);
  return Promise.all([apiUrl1, apiUrl2, apiUrl3, apiUrl4, apiUrl5]).then(
    (resolve) => {
      let [apiUrl1, apiUrl2, apiUrl3, apiUrl4, apiUrl5] = resolve;

      games = [
        ...apiUrl1.data.results,
        ...apiUrl2.data.results,
        ...apiUrl3.data.results,
        ...apiUrl4.data.results,
        ...apiUrl5.data.results,
      ].map((mp) => {
        return {
          id: mp.id,
          name: mp.name,
          description: mp.description,
          platform: mp.platforms.map((e) => e.platform.name),
          img: mp.background_image,
          rating: mp.rating,
          released: mp.released,
          gId: mp.genres.map((e) => e.name),
          createdInDb: false,
        };
      });
      // console.log("2", games);
      return games;
    }
  );
};

async function getApiGenres() {
  const url = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  // console.log("1", url);
  // var genres = []
  const genres = url.data.results.map((mp) => {
    return {
      name: mp.name,
    };
  });
  console.log("1", genres);
  return genres;
}

async function loadDb() {
  try {
    {
      const videogames = await getApiInfo();
      await Promise.all(
        videogames.map(async (e) => {
          // console.log(e);
          await Videogame.create(e);
        })
      );
      // console.log('DB loaded');
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadGenreDb() {
  try {
    {
      const genres = await getApiGenres();
      await Promise.all(
        genres.map(async (e) => {
          // console.log(e);
          await Genre.create(e);
        })
      );
    }
    // console.log('DB loaded');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { loadDb, loadGenreDb };
