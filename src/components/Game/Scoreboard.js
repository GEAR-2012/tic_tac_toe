import React from "react";

import classes from "./Scoreboard.module.css";

const Scoreboard = (props) => {
  return (
    <div className={classes.scoreboard}>
      <div className={classes.item}>
        <p className={classes.player}>PLAYER (X)</p>
        <p className={classes.score}>{props.scorePlayerA}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.player}>TIE</p>
        <p className={classes.score}>{props.scoreTie}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.player}>COMPUTER (O)</p>
        <p className={classes.score}>{props.scorePlayerB}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
