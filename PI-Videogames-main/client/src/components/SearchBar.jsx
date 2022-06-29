import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGame } from "../actions";
import styles from "./SearchBar.module.css";
import { ImSearch } from "react-icons/im";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length) {
      alert("Please Writing a VideoGame");
    } else {
      dispatch(getNameVideoGame(name));
      setName("");
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.searchbar}>
          <input
            className={styles.input}
            type="text"
            value={name}
            placeholder="Search your Video Game"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <button className={styles.searchbarbtn} type="submit">
            <ImSearch />
          </button>
        </div>
      </form>
    </>
  );
}
