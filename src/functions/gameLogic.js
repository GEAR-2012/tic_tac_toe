// checks for free spots on gameboard return true if so else return false
export const checkForFreeSpot = (state) => {
  return Object.values(state).includes(null);
};

// its looking for possible threats or winning possibilities
export const getTargets = (state, markA, markB, mode) => {
  let searchedMark;
  if (mode === "defense") {
    searchedMark = markA;
  } else if (mode === "offense") {
    searchedMark = markB;
  }
  const targets = [];
  if (checkRows(state, markA, markB, searchedMark).targets) {
    targets.push(...checkRows(state, markA, markB, searchedMark).targets);
  }
  if (checkCols(state, markA, markB, searchedMark).targets) {
    targets.push(...checkCols(state, markA, markB, searchedMark).targets);
  }
  if (checkLeftRight(state, markA, markB, searchedMark).targets) {
    targets.push(...checkLeftRight(state, markA, markB, searchedMark).targets);
  }
  return targets;
};

// check for matchins or possible targets
const checkRows = (state, markA, markB, searchedMark) => {
  let matchingSet;
  const targets = [];
  const keys = ["a", "b", "c"];
  keys.forEach((key) => {
    // make a set with the marks
    const pattern = new RegExp(key);
    const set = Object.entries(state).filter((spot) => (pattern.test(spot[0]) ? spot : false));
    // check for 3 matches
    matchingSet = matchingSet ?? checkFor3Matches(set, markA, "row");
    matchingSet = matchingSet ?? checkFor3Matches(set, markB, "row");
    // check for defensive targets
    if (lookingForTargets(set, searchedMark)) {
      targets.push(lookingForTargets(set, searchedMark));
    }
  });
  return { targets: targets, matchingRow: matchingSet };
};

const checkCols = (state, markA, markB, searchedMark) => {
  let matchingSet;
  const targets = [];
  const keys = ["0", "1", "2"];
  keys.forEach((key) => {
    // make a set with the marks
    const pattern = new RegExp(key);
    const set = Object.entries(state).filter((spot) => (pattern.test(spot[0]) ? spot : false));
    // check for 3 matches
    matchingSet = matchingSet ?? checkFor3Matches(set, markA, "col");
    matchingSet = matchingSet ?? checkFor3Matches(set, markB, "col");
    // check for defensive targets
    if (lookingForTargets(set, searchedMark)) {
      targets.push(lookingForTargets(set, searchedMark));
    }
  });
  return { targets: targets, matchingCol: matchingSet };
};

const checkLeftRight = (state, markA, markB, searchedMark) => {
  let matching;
  const targets = [];
  // making line arrays
  const lineLeft = Object.entries(state).filter((spot) => spot[0] === "a0" || spot[0] === "b1" || spot[0] === "c2");
  const lineRight = Object.entries(state).filter((spot) => spot[0] === "a2" || spot[0] === "b1" || spot[0] === "c0");
  // checking 3 matches

  matching = matching ?? checkFor3Matches(lineLeft, markA, "left");
  matching = matching ?? checkFor3Matches(lineLeft, markB, "left");
  matching = matching ?? checkFor3Matches(lineRight, markA, "right");
  matching = matching ?? checkFor3Matches(lineRight, markB, "right");

  if (lookingForTargets(lineLeft, searchedMark)) {
    targets.push(lookingForTargets(lineLeft, searchedMark));
  }
  if (lookingForTargets(lineRight, searchedMark)) {
    targets.push(lookingForTargets(lineRight, searchedMark));
  }
  return { targets: targets, matching: matching };
};

// check for 3 same marks in a set
const checkFor3Matches = (set, mark, type) => {
  if (set.filter((item) => item[1] === mark).length === 3) {
    // returns the key of matched line & the mark
    // get key
    let key;
    if (type === "row") {
      key = set[0][0].slice(0, 1);
    } else if (type === "col") {
      key = set[0][0].slice(1);
    } else if (type === "left") {
      key = "l";
    } else if (type === "right") {
      key = "r";
    }
    return key + mark; // '1X' or 'bO' or 'cX'
  }
};

// check for 2 same mark & an empty place in a set
const lookingForTargets = (set, mark) => {
  const countSameMarks = set.filter((item) => item[1] === mark).length;
  const countEmptySpots = set.filter((item) => item[1] === null).length;
  if (countSameMarks > 1) {
    if (countEmptySpots === 1) {
      // returns the key of the spot
      const [keyOfTarget] = set.filter((item) => item[1] === null).map((spot) => spot[0]);
      return keyOfTarget;
    }
  }
};

export const checkForWinner = (state, markA, markB) => {
  const row = checkRows(state, markA, markB).matchingRow;
  const col = checkCols(state, markA, markB).matchingCol;
  const leftRight = checkLeftRight(state, markA, markB).matching;
  let winner;
  let line;

  if (row || col || leftRight) {
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
    return { winner: winner, line: line };
  } else {
    return false;
  }
};
