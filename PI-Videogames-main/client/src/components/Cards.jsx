import React from "react";
import styles from "./Cards.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Card({ name, image, genres, id, rating }) {
  let genero = genres.map((e) => e.name);
  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3MYK9uCCaF8EU4EuIa49ENlTn20Sl2puG1raf3O53xZ_65yx";

  return (
    <div className={styles.bckCard}>
      <li className={styles.GameCard}>
        <Link to={"/videogame/" + id}>
          <img
            className={styles.Img}
            src={image || imgUrl}
            alt="img not found"
            width="250px"
            height="300px"
          />
        </Link>
        <div className={styles.title}>{name}</div>

        <div className={styles.title}>Genres: </div>
        <div className={styles.title}>{genero.join("-")}</div>
      </li>
    </div>
  );
}
