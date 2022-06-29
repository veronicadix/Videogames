import React, { useState, useEffect } from "react";
import { getGenres, postVideoGame, getPlatforms } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GameCreated.module.css";
import { FaTrash } from "react-icons/fa";
import { ImHome3 } from "react-icons/im";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function validate(input) {
  let error = {};
  //Si algun parametro no inserta retorna error
  if (!input.name.trim()) {
    error.name = "Name require";
  }
  if (!input.description.trim()) {
    error.description = "Description require";
  }
  /*if (!input.platforms.trim) {
    error.platforms = "Platforms require";
  }*/
  return error;
}

export default function GameCreated() {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectPlatform(e) {
    setInput({
      ...input,
      platform: [...input.platform, e.target.value],
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    if (Object.keys(errors).length === 0) {
      dispatch(postVideoGame(input));
      alert("VideoGame create!");
      setInput({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        genres: [],
      });
    } else {
      alert("ERROR! Video Game no created");
      return;
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  }

  function handleDeletePlat(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((g) => g !== e),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    console.log(platforms);
    dispatch(getPlatforms());
  }, [dispatch]);

  return (
    <>
      <div className={styles.btnH}>
        <Link className={styles.btn1} to="/home">
          Back Home
        </Link>
      </div>

      <div className={styles.mainscreen}>
        <div className={styles.CreateRecipe}>
          <div className={styles.leftside}>
            <p className={styles.product} />
          </div>
          <div className={styles.rightside}>
            <form
              className={styles.CreationForm}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <input
                  className={styles.inputC}
                  placeholder="Video game's name"
                  required
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && <p className={styles.errors}>{errors.name}</p>}
              </div>
              <div>
                <label className="label">Platforms: </label>
                <select
                  className="select"
                  name="platform"
                  onChange={handleSelectPlatform}
                  value={input.plataformas}
                >
                  <option disabled>Select video game platforms: </option>
                  <option hidden>Select video game platforms</option>
                  {input.platform?.map((plataformas, i) => {
                    return (
                      <option key={i} value={plataformas()}>
                        {plataformas()}
                      </option>
                    );
                  })}
                </select>
              </div>
              <p />
              <div>
                <input
                  className={styles.inputC}
                  placeholder="Description"
                  type="text"
                  required
                  value={input.description}
                  name="description"
                  onChange={(e) => handleChange(e)}
                />
                {errors.description && (
                  <p className={styles.errors}>{errors.description}</p>
                )}
              </div>

              <div className={styles.expcvv}>
                <p className={styles.expcvv_text}>Release date</p>

                <div className={styles.dateC}>
                  <input
                    type="date"
                    value={input.releaseDate}
                    className={styles.inputC}
                    name="releaseDate"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <p className={styles.expcvv_text2}>Score:</p>
                <div className={styles.dateC}>
                  <input
                    className={styles.score}
                    type="number"
                    value={input.rating}
                    min="0"
                    max="5"
                    step="0.01"
                    name="rating"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <p>Genres</p>
              <select
                className={styles.select}
                onChange={(e) => handleSelect(e)}
              >
                <option disabled>Select Video Game's Genres </option>
                <option hidden>Select Video Game's genres</option>
                {generos.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>

              <div className={styles.genreC}>
                {input.genres.map((g) => (
                  <div key={g.name} className={styles.diet}>
                    <p>{g}</p>

                    <FaTrash onClick={() => handleDelete(g)} />
                  </div>
                ))}
              </div>

              <div className={styles.divHome}>
                <button type="submit" className={styles.btn}>
                  Add new Video Game
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
