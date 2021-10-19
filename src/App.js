import React, { useState } from "react";
import MenuModal from "./components/UI/MenuModal";
import Header from "./components/Game/Header";
import Gameboard from "./components/Game/Gameboard";
import Scoreboard from "./components/Game/Scoreboard";
import { checkForWinner, checkForFreeSpot, getTargets } from "./functions/gameLogic";
import classes from "./App.module.css";

const initialGameMap = {
  a0: null,
  a1: null,
  a2: null,
  b0: null,
  b1: null,
  b2: null,
  c0: null,
  c1: null,
  c2: null,
};
let state;
let isGameEnd = false;
// Player A mark 'X'
const markA = "X";
// Player B mark 'O'
const markB = "O";
let isPlayerMarked = Math.floor(Math.random() * 2);
// levels:
// level 0 => only random machine targets
// level 1 => defense targets
// level 2 => defense & offense targets

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState("0");
  const [level, setLevel] = useState(2);
  const [gameMap, setGameMap] = useState(initialGameMap);
  const [scorePlayerA, setScorePlayerA] = useState(0);
  const [scorePlayerB, setScorePlayerB] = useState(0);
  const [scoreTie, setScoreTie] = useState(0);
  const [highlight, setHighlight] = useState();

  const openMenuHandler = () => {
    setIsMenuOpen("1");
  };

  const closeMenuHandler = () => {
    setIsMenuOpen("0");
  };

  const setLevelHandler = (num) => {
    setLevel(num);
  };

  state = { ...gameMap };

  const checkGameStatus = () => {
    if (checkForWinner(state, markA, markB)) {
      isGameEnd = true;
      const result = checkForWinner(state, markA, markB);
      if (result.winner === markA) {
        setScorePlayerA((prevScore) => {
          return ++prevScore;
        });
      }
      if (result.winner === markB) {
        setScorePlayerB((prevScore) => {
          return ++prevScore;
        });
      }
      setHighlight(result.line);
    } else if (!checkForFreeSpot(state)) {
      isGameEnd = true;
      setScoreTie((prevScore) => {
        return ++prevScore;
      });
      setHighlight("t");
    }
  };

  const spotClickHandler = (spotId) => {
    if (isGameEnd) {
      newGame();
    } else if (gameMap[spotId] === null && !isPlayerMarked) {
      isPlayerMarked = true;
      state = { ...gameMap, [spotId]: markA };
      setGameMap((prevState) => {
        return {
          ...prevState,
          [spotId]: markA,
        };
      });
      checkGameStatus();
    }
  };

  const newGame = () => {
    setGameMap(initialGameMap);
    setHighlight(null);
    isGameEnd = false;
  };

  // if it is the machine turn
  if (!isGameEnd) {
    if (isPlayerMarked && Object.values(gameMap).includes(null)) {
      setTimeout(() => {
        isPlayerMarked = false;
        const targets = [];
        const targetsOffense = getTargets(state, markA, markB, "offense");
        const targetsDefense = getTargets(state, markA, markB, "defense");
        const targetsRemains = Object.entries(gameMap)
          .filter((spot) => spot[1] === null && spot)
          .map((spot) => spot[0]);

        if (targetsOffense.length > 0 && level === 2) {
          // offense mode
          targets.push(...targetsOffense);
        } else if (targetsDefense.length > 0 && level >= 1) {
          // defense mode
          targets.push(...targetsDefense);
        } else if (level >= 0) {
          // remains mode
          targets.push(...targetsRemains);
        }

        machineMark(targets);
        checkGameStatus();
      }, 600);
    }
  }

  const machineMark = (targets) => {
    const targLen = targets.length;
    if (targLen > 1) {
      const targIndex = Math.floor(Math.random() * targLen);
      state = { ...gameMap, [targets[targIndex]]: markB };
      setGameMap((prevState) => {
        return {
          ...prevState,
          [targets[targIndex]]: markB,
        };
      });
    } else {
      state = { ...gameMap, [targets]: markB };

      setGameMap((prevState) => {
        return {
          ...prevState,
          [targets]: markB,
        };
      });
    }
  };

  return (
    <React.Fragment>
      {isMenuOpen === "1" && <MenuModal level={level} onLevelChange={setLevelHandler} onCloseMenu={closeMenuHandler} />}
      <div className={classes.app}>
        <Header onClickMenu={openMenuHandler} />
        <Gameboard highlight={highlight} onSpotClick={spotClickHandler} gameMap={gameMap} />
        <Scoreboard scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB} scoreTie={scoreTie} />
      </div>
    </React.Fragment>
  );
}

export default App;
