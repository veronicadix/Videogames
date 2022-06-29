import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  filterCreatedDB,
  getGenres,
  getVideoGames,
  orderByName,
  orderByRating,
  filterByGenre,
} from "../actions";

import Card from "./Cards";
import Paginado from "./Paginado";
import styles from "./Home.module.css";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
//import { ImHome3 } from "react-icons/im";
//import { IoAdd } from "react-icons/io5";

export default function Home() {
  const dispatch = useDispatch(); //Para utilizar la constante e ir despachando las acciones
  const allVideoGames = useSelector((state) => state.videoGames); //Trae todo lo que esta en el estado videoGames
  const videogameState = useSelector((state) => state.allVideoGames); //Trae todo lo que esta en el estado allvideoGames

  const [currentPages, setCurrentPages] = useState(1);
  const [gamesPerPage, _setgamesPerPage] = useState(15);
  const [_orden, setOrden] = useState("");

  const indexLastGame = currentPages * gamesPerPage;
  const indexFirstGame = indexLastGame - gamesPerPage;
  const currentGames = allVideoGames.slice(indexFirstGame, indexLastGame);

  const paginado = (pageNum) => {
    //Me ayuda a renderizar
    setCurrentPages(pageNum);
  };

  //despacho las acciones que me trae los generos u platforms
  useEffect(() => {
    dispatch(getGenres()); //Despacho la acc
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVideoGames()); //despach la acción que me trae los videojuegos
  }, [dispatch]);

  if (!allVideoGames.length && !videogameState.length) {
    return <Spinner />;
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGames());
  }

  //Las sigtes funciones llaman a las funciones que realizan filtros y ordenamientos en actions
  //Ordenamiento ASC DES
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value)); //value define el tipo de ordenamiento
    setCurrentPages(1);
    setOrden(e.target.value);
  }

  //Ordenamiento puntaje
  function handleScore(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPages(1);
    setOrden(e.target.value);
  }

  //Filtro tipo creacion
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreatedDB(e.target.value));
    setCurrentPages(1);
    setOrden(e.target.value);
  }

  //Filtro genero
  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPages(1);
    setOrden(e.target.value);
  }

  return (
    <div className={styles.bck}>
      <div>
        <NavBar
          handleSort={handleSort}
          handleScore={handleScore}
          handleFilterCreated={handleFilterCreated}
          handleFilterGenre={handleFilterGenre}
        />
      </div>

      <div className={styles.btnreload}>
        <button className={styles.btn30}>
          <Link className={styles.link} to="/creategame">
            Create new Game
          </Link>
        </button>

        <button
          className={styles.btn30}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload page
        </button>
      </div>

      <ul className={styles.gameGrid}>
        {currentGames?.map((g) => {
          return (
            <Card
              key={g.id}
              name={g.name}
              image={g.img}
              genres={g.genres}
              rating={g.rating}
              platforms={g.platforms}
            />
          );
        })}
      </ul>

      <div style={{ marginBottom: "2rem" }}>
        <Paginado
          gamesTotal={gamesPerPage}
          allVideoGames={allVideoGames.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
