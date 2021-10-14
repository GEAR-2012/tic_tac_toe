import React, { useState } from "react";
import Header from "./components/Game/Header";
import Gameboard from "./components/Game/Gameboard";
import Scoreboard from "./components/Game/Scoreboard";
import { machineDefense, checkRows, checkCols, checkLeftRight } from "./functions/gameLogic";
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

function App() {
  const [gameMap, setGameMap] = useState(initialGameMap);
  const [scorePlayerA, setScorePlayerA] = useState(0);
  const [scorePlayerB, setScorePlayerB] = useState(0);
  const [scoreTie, setScoreTie] = useState(0);
  const [highlight, setHighlight] = useState();

  state = { ...gameMap };

  const spotClickHandler = (spotId) => {
    if (isGameEnd) {
      newGame();
    } else if (gameMap[spotId] === null) {
      isPlayerMarked = true;
      state = { ...gameMap, [spotId]: markA };
      setGameMap((prevState) => {
        return {
          ...prevState,
          [spotId]: markA,
        };
      });
      checkForTie();
      checkForWinner();
    }
  };

  const newGame = () => {
    setGameMap(initialGameMap);
    setHighlight(null);
    isGameEnd = false;
  };

  if (!isGameEnd) {
    if (isPlayerMarked && Object.values(gameMap).includes(null)) {
      isPlayerMarked = false;
      setTimeout(() => {
        const targets = machineDefense(state, markA, markB);
        if (targets.length > 0) {
          machineMark(targets);
        } else {
          const remainingSpots = Object.entries(gameMap)
            .filter((spot) => spot[1] === null && spot)
            .map((spot) => spot[0]);
          machineMark(remainingSpots);
        }
        checkForTie();
        checkForWinner();
      }, 600);
    }
  }

  const checkForTie = () => {
    if (!Object.values(state).includes(null)) {
      isGameEnd = true;
      setScoreTie((prevScore) => {
        return ++prevScore;
      });
      setHighlight("t");
    }
  };

  const checkForWinner = () => {
    const row = checkRows(state, markA, markB).matchingRow;
    const col = checkCols(state, markA, markB).matchingCol;
    const leftRight = checkLeftRight(state, markA, markB).matching;
    let winner;
    let line;

    if (row || col || leftRight) {
      isGameEnd = true;
      if (row) {
        winner = row[1];
        line = row[0];
      }
      if (col) {
        winner = col[1];
        line = col[0];
      }
      if (leftRight) {
        winner = leftRight[1];
        line = leftRight[0];
      }

      if (winner === "A") {
        setScorePlayerA((prevScore) => {
          return ++prevScore;
        });
      }
      if (winner === "B") {
        setScorePlayerB((prevScore) => {
          return ++prevScore;
        });
      }
      setHighlight(line);
    }
  };

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
    <div className={classes.app}>
      <Header />
      <Gameboard highlight={highlight} onSpotClick={spotClickHandler} gameMap={gameMap} />
      <Scoreboard scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB} scoreTie={scoreTie} />
    </div>
  );
}

export default App;
