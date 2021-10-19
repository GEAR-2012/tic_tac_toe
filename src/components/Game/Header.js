import React from "react";
import VerticalDotMenu from "../UI/VerticalDotMenu";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <h1 className={classes.title}>Tic Tac Toe</h1>
      <VerticalDotMenu onClickMenu={props.onClickMenu} />
    </div>
  );
};

export default Header;
