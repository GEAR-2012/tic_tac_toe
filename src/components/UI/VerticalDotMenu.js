import React from "react";
import classes from "./VerticalDotMenu.module.css";

const VerticalDotMenu = (props) => {
  const menuClickHandler = () => {
    props.onClickMenu();
  };

  return (
    <div onClick={menuClickHandler} className={classes.menu}>
      <div className={classes.dot} />
      <div className={classes.dot} />
      <div className={classes.dot} />
    </div>
  );
};

export default VerticalDotMenu;
