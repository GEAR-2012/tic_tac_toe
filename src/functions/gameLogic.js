export const machineDefense = (state, markA, markB) => {
  const targets = [];

  if (checkRows(state, markA, markB).targets) {
    targets.push(...checkRows(state, markA, markB).targets);
  }

  if (checkCols(state, markA, markB).targets) {
    targets.push(...checkCols(state, markA, markB).targets);
  }

  if (checkLeftRight(state, markA, markB).targets) {
    targets.push(...checkLeftRight(state, markA, markB).targets);
  }

  return targets;
};

export const checkRows = (state, markA, markB) => {
  let matchingRow;
  const targets = [];

  const rowA = Object.entries(state).filter((spot) => spot[0][0] === "a" && spot);
  const rowB = Object.entries(state).filter((spot) => spot[0][0] === "b" && spot);
  const rowC = Object.entries(state).filter((spot) => spot[0][0] === "c" && spot);
  if (rowA.filter((col) => col[1] === markA).length === 3) {
    matchingRow = "aA";
  }
  if (rowA.filter((col) => col[1] === markB).length === 3) {
    matchingRow = "aB";
  }
  if (rowB.filter((col) => col[1] === markA).length === 3) {
    matchingRow = "bA";
  }
  if (rowB.filter((col) => col[1] === markB).length === 3) {
    matchingRow = "bB";
  }
  if (rowC.filter((col) => col[1] === markA).length === 3) {
    matchingRow = "cA";
  }
  if (rowC.filter((col) => col[1] === markB).length === 3) {
    matchingRow = "cB";
  }
  // row A
  if (rowA.filter((col) => col[1] === markA).length > 1) {
    if (rowA.filter((col) => col[1] === null).length === 1) {
      targets.push(rowA.find((col) => col[1] === null)[0]);
    }
  }
  // row B
  if (rowB.filter((col) => col[1] === markA).length > 1) {
    if (rowB.filter((col) => col[1] === null).length === 1) {
      targets.push(rowB.find((col) => col[1] === null)[0]);
    }
  }
  // row C
  if (rowC.filter((col) => col[1] === markA).length > 1) {
    if (rowC.filter((col) => col[1] === null).length === 1) {
      targets.push(rowC.find((col) => col[1] === null)[0]);
    }
  }

  return { targets: targets, matchingRow: matchingRow };
};

export const checkCols = (state, markA, markB) => {
  let matchingCol;
  const targets = [];
  const col0 = Object.entries(state).filter((spot) => spot[0][1] === "0" && spot);
  const col1 = Object.entries(state).filter((spot) => spot[0][1] === "1" && spot);
  const col2 = Object.entries(state).filter((spot) => spot[0][1] === "2" && spot);
  if (col0.filter((row) => row[1] === markA).length === 3) {
    matchingCol = "0A";
  }
  if (col0.filter((row) => row[1] === markB).length === 3) {
    matchingCol = "0B";
  }
  if (col1.filter((row) => row[1] === markA).length === 3) {
    matchingCol = "1A";
  }
  if (col1.filter((row) => row[1] === markB).length === 3) {
    matchingCol = "1B";
  }
  if (col2.filter((row) => row[1] === markA).length === 3) {
    matchingCol = "2A";
  }
  if (col2.filter((row) => row[1] === markB).length === 3) {
    matchingCol = "2B";
  }
  // col 0
  if (col0.filter((row) => row[1] === markA).length > 1) {
    if (col0.filter((row) => row[1] === null).length === 1) {
      targets.push(col0.find((row) => row[1] === null)[0]);
    }
  }
  // col 1
  if (col1.filter((row) => row[1] === markA).length > 1) {
    if (col1.filter((row) => row[1] === null).length === 1) {
      targets.push(col1.find((row) => row[1] === null)[0]);
    }
  }
  // col 2
  if (col2.filter((row) => row[1] === markA).length > 1) {
    if (col2.filter((row) => row[1] === null).length === 1) {
      targets.push(col2.find((row) => row[1] === null)[0]);
    }
  }

  return { targets: targets, matchingCol: matchingCol };
};

export const checkLeftRight = (state, markA, markB) => {
  let matching;
  const targets = [];
  const lineLeft = Object.entries(state).filter((spot) => spot[0] === "a0" || spot[0] === "b1" || spot[0] === "c2");
  const lineRight = Object.entries(state).filter((spot) => spot[0] === "a2" || spot[0] === "b1" || spot[0] === "c0");

  if (lineLeft.filter((spot) => spot[1] === markA).length === 3) {
    matching = "lA";
  }
  if (lineLeft.filter((spot) => spot[1] === markB).length === 3) {
    matching = "lB";
  }
  if (lineRight.filter((spot) => spot[1] === markA).length === 3) {
    matching = "rA";
  }
  if (lineRight.filter((spot) => spot[1] === markB).length === 3) {
    matching = "rB";
  }

  // line left
  if (lineLeft.filter((spot) => spot[1] === markA).length > 1) {
    if (lineLeft.filter((spot) => spot[1] === null).length === 1) {
      targets.push(lineLeft.find((spot) => spot[1] === null)[0]);
    }
  }
  // line right
  if (lineRight.filter((spot) => spot[1] === markA).length > 1) {
    if (lineRight.filter((spot) => spot[1] === null).length === 1) {
      targets.push(lineRight.find((spot) => spot[1] === null)[0]);
    }
  }

  return { targets: targets, matching: matching };
};
