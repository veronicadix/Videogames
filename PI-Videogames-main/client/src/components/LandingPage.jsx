import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.circle}>
        <p className={styles.subtittle}> Welcome to </p>
        <p className={styles.tittle}>The Gamer's World</p>
        <p className={styles.note}>
          {" "}
          In the end, we only regret what we haven't done
        </p>

        <Link to="/home">
          <button className={styles.bn30}>Start</button>
        </Link>
      </div>
    </div>
  );
}
