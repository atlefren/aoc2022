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

const getVisible = (input) =>
  input.reduce(
    (acc, l, x) => [
      ...acc,
      ...l
        .map((value, y) => ({
          x,
          y,
          value,
        }))
        .filter(({ y, x, value }) => isVisible(value, x, y, input)),
    ],
    []
  );

const countVisible = (val, line) => {
  let c = 0;
  for (let i = 0; i < line.length; i++) {
    c++;
    if (line[i] >= val) {
      return c;
    }
  }
  return c;
};

const getScenicScore = (value, x, y, matrix) =>
  getSides(matrix, x, y).reduce(
    (acc, line) => acc * countVisible(value, line),
    1
  );

const getScenicScores = (input) =>
  input.reduce(
    (acc, l, x) => [
      ...acc,
      ...l.map((value, y) => getScenicScore(value, x, y, input)),
    ],
    []
  );

const task1 = (input) => getVisible(input).length;

const task2 = (input) => Math.max(...getScenicScores(input));

run(parse, task1, task2, true);
