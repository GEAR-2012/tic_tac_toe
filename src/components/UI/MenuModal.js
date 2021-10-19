import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import RadioSelector from "./RadioSelector";

import classes from "./MenuModal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onCloseMenu} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  const levelChangeHandler = (e) => {
    const id = parseInt(e.target.id, 10);
    props.onLevelChange(id);
  };

  return (
    <Card className={classes.menu}>
      <h2 className={classes.title}>Menu</h2>
      <RadioSelector level={props.level} onLevelChange={levelChangeHandler} />
    </Card>
  );
};

const MenuModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onCloseMenu={props.onCloseMenu} />, document.getElementById("backdrop-root"))}

      {ReactDOM.createPortal(
        <ModalOverlay onLevelChange={props.onLevelChange} level={props.level} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default MenuModal;
