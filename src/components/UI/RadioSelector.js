import React from "react";

import classes from "./RadioSelector.module.css";

const levels = [0, 1, 2];

const RadioSelector = (props) => {
  const radioInputs = levels.map((level) => {
    return (
      <label key={level} className={classes.radio}>
        <span className={classes.radio__input}>
          <input
            id={level}
            checked={props.level === level ? true : false}
            onChange={props.onLevelChange}
            type="radio"
            name="level"
          />
          <span className={classes.radio__control} />
        </span>
        <span className={classes.radio__label}>Level {level + 1}</span>
      </label>
    );
  });
  return <div className={classes.radios}>{radioInputs}</div>;
};

export default RadioSelector;
