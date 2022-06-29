import React from "react";
import { useSelector } from "react-redux";
import styles from "./NavBar.module.css";
import SearchBar from "./SearchBar";

export default function NavBar({
  handleFilterGenre,
  handleFilterCreated,
  handleScore,
  handleSort,
}) {
  const allGenre = useSelector((state) => state.genres);

  return (
    <div className={styles.nav}>
      <div className={styles.cnt}>
        <SearchBar />
      </div>

      <div className={styles.cnt}>
        <div>
          <select
            defaultValue="DEFAULT"
            className={styles.selectCont}
            onChange={(e) => handleSort(e)}
          >
            <option disabled="disabled" value="DEFAULT" name="DEFAULT">
              Order ⇵
            </option>

            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className={styles.selectCont}
            defaultValue="DEFAULT"
            onChange={(e) => handleScore(e)}
          >
            <option disabled="disabled" value="DEFAULT">
              Rating ⇵
            </option>
            <option value="top">Rating Top</option>
            <option value="low">Rating Low</option>
          </select>

          <select
            defaultValue="DEFAULT"
            className={styles.selectCont}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option disabled="disabled" value="DEFAULT">
              Games
            </option>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">Existent</option>
          </select>

          <select
            defaultValue="DEFAULT"
            className={styles.selectCont}
            name="FilterGenre"
            onChange={(e) => handleFilterGenre(e)}
          >
            <option disabled="disabled" value="DEFAULT">
              Genres
            </option>
            <option value="all">All</option>

            {allGenre.map((genre) => (
              <option key={genre.name} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
