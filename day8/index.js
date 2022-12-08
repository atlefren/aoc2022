const { run } = require("../run");

const parse = (i) => i.split("").map((n) => parseInt(n, 10));

const getColumn = (matrix, i) => matrix.map((row) => row[i]);

const getSides = (matrix, x, y) => {
  const col = getColumn(matrix, y);

  return [
    col.slice(0, x).reverse(),
    matrix[x].slice(0, y).reverse(),
    matrix[x].slice(y + 1),
    col.slice(x + 1),
  ];
};

const isVisible = (value, x, y, matrix) =>
  getSides(matrix, x, y).some((side) => side.every((e) => value > e));

const loopMatrix = (matrix, func) =>
  matrix.reduce(
    (acc, l, x) => [...acc, ...l.map((value, y) => func(value, x, y, matrix))],
    []
  );

const countVisible = (val, line) =>
  line.reduce(
    (acc, value) =>
      acc.stopped ? acc : { stopped: value >= val, count: acc.count + 1 },
    { count: 0, stopped: false }
  ).count;

const getScenicScore = (value, x, y, matrix) =>
  getSides(matrix, x, y).reduce(
    (acc, line) => acc * countVisible(value, line),
    1
  );

const task1 = (input) =>
  loopMatrix(input, (value, x, y, matrix) => ({
    x,
    y,
    value,
    matrix,
  })).filter(({ y, x, value, matrix }) => isVisible(value, x, y, matrix))
    .length;

const task2 = (input) => Math.max(...loopMatrix(input, getScenicScore));

run(parse, task1, task2, true);
