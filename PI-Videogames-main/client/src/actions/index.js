import axios from "axios";

//Traer todos los videogames
export function getVideoGames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/"); //Paso la ruta que trae los videogames

    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

//Traer videogames por nombre
export function getNameVideoGame(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );

      return dispatch({
        type: "GET_NAME_VIDEOGAME",
        payload: json.data,
      });
    } catch (error) {
      alert("Game Not Found");
    }
  };
}

//Traer generos
export function getGenres() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/genres", {});
    return dispatch({ type: "GET_GENRES", payload: info.data });
  };
}

//Crear videojuego
export function postVideoGame(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/videogame",
      payload
    );
    console.log(response);
    return response;
  };
}

//Filtrar de DB
export function filterCreatedDB(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

//Filtrar por genero
export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

//Ordenar por nombre
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

//ordenar por rating
export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

//Traer por id
export function getDetail(id) {
  if (id) {
    return async function (dispatch) {
      try {
        let json = await axios.get("http://localhost:3001/videogame/" + id);

        return dispatch({
          type: "GET_DETAIL",
          payload: json.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  return {
    type: "RESET",
  };
}

//Traer platforms
export function getPlatforms() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/");

    dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
}
