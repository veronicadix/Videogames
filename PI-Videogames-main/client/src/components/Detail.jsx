import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import styles from "./Detail.module.css";

//import { RiArrowGoBackFill } from "react-icons/ri";

export default function Detail(props) {
  const videogame = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);
  var detail = useSelector((state) => state.detail);

  const imgUrl =
    "https://thumbs.dreamstime.com/b/se%C3%B1al-de-ne%C3%B3n-la-m%C3%A1quina-juego-arcada-122983326.jpg";

  const plataformas = () => {
    if (videogame.length === 0) return;
    if (videogame.platforms) {
      // console.log(videogame.platform)
      const platformsName = videogame.platforms.map((e) => e.platform.name);
      return platformsName.join(", ");
    } else {
      return videogame.platform.join(", ");
    }
  };

  function handleReset() {
    dispatch(getDetail());
  }

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div className={styles.bck}>
      {detail.length === 0 ? (
        <div className={styles.load}>
          <p>...Loading</p>
        </div>
      ) : (
        <>
          <div className={styles.btnC}>
            <Link className={styles.btn} to="/home" onClick={handleReset}>
              Back Home{""}
            </Link>
          </div>

          <div className={styles.detailContainer}>
            <div className={styles.detailContainer}>
              <img
                className={`${styles.col} ${styles.imgDetail}`}
                src={detail.background_image || imgUrl}
                alt={detail.name}
              />
              <div className={`${styles.col} ${styles.VideoGameDetails}`}>
                <p className={styles.firstItem}>
                  <strong>Title: </strong> {detail.name}
                </p>

                <p>
                  <strong>Released date:</strong>{" "}
                  {detail.released || detail.releaseDate}
                </p>

                <p>
                  <strong>Genres: </strong>
                  {detail.genres?.map((g) => g.name).join("-")}
                </p>

                <p>
                  <strong>Score: </strong>
                  {detail.rating}
                </p>

                <p>
                  <strong>Platform: </strong>
                  {plataformas()}
                </p>

                <p>
                  <strong>Description: </strong>
                  {detail.description_raw || detail.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
