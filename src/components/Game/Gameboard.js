import React from "react";

import classes from "./Gameboard.module.css";

const Gameboard = (props) => {
  const clickHandler = (e) => {
    props.onSpotClick(e.target.id);
  };

  let extraClass;
  switch (props.highlight) {
    case "l":
      extraClass = "left";
      break;
    case "r":
      extraClass = "right";
      break;
    case "t":
      extraClass = "tie";
      break;
    case "a":
      extraClass = "row-a";
      break;
    case "b":
      extraClass = "row-b";
      break;
    case "c":
      extraClass = "row-c";
      break;
    case "0":
      extraClass = "col-0";
      break;
    case "1":
      extraClass = "col-1";
      break;
    case "2":
      extraClass = "col-2";
      break;
    default:
      break;
  }

  const gameMarks = Object.entries(props.gameMap).map((property) => {
    const row = property[0][0];
    const col = property[0][1];
    const coor = property[0];
    const mark = property[1];
    let colClass;
    if (extraClass) {
      colClass = "dim";
      if (row === props.highlight || col === props.highlight) {
        colClass = "hgl";
      }
      if (extraClass === "left") {
        switch (coor) {
          case "a0":
          case "b1":
          case "c2":
            colClass = "hgl";
            break;
          default:
            break;
        }
      }
      if (extraClass === "right") {
        switch (coor) {
          case "a2":
          case "b1":
          case "c0":
            colClass = "hgl";
            break;
          default:
            break;
        }
      }
    }
    return (
      <div key={coor} id={coor} onClick={clickHandler} className={`${classes.spot} ${classes[colClass]}`}>
        <p className={classes.mark}>{mark}</p>
      </div>
    );
  });

  return <div className={`${classes.gameboard} ${classes[extraClass]}`}>{gameMarks}</div>;
};

export default Gameboard;
