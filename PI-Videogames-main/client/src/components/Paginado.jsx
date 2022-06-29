import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ gamesTotal, allVideoGames, paginado }) {
  const pageNums = []; //

  // redondear!!!!
  for (let i = 1; i <= Math.ceil(allVideoGames / gamesTotal); i++) {
    pageNums.push(i);
  }

  return (
    <div className={style.pos}>
      {pageNums &&
        pageNums.map((number) => (
          <button key={number} onClick={() => paginado(number)}>{number}</button>
        ))}
    </div>
  );
}