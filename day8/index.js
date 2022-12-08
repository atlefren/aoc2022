const { run } = require("../run");

const parse = (i) => i.split("").map((n) => parseInt(n, 10));

const getColumn = (matrix, i) => matrix.map((row) => row[i]);

const isVisible = (x, y, matrix) => {
  const value = matrix[x][y];

  const left = matrix[x].slice(0, y);
  const right = matrix[x].slice(y + 1);

  const col = getColumn(matrix, y);
  const top = col.slice(0, x);
  const bottom = col.slice(x + 1);

  return (
    left.every((e) => value > e) ||
    right.every((e) => value > e) ||
    top.every((e) => value > e) ||
    bottom.every((e) => value > e)
  );
};

const getVisible = (input) =>
  input.reduce((acc, l, x) => {
    const num = l
      .map((_, y) => ({
        x,
        y,
      }))
      .filter(({ y, x }) => isVisible(x, y, input));

    return [...acc, ...num];
  }, []);

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

const getScenicScore = (x, y, matrix) => {
  const value = matrix[x][y];
  const left = matrix[x].slice(0, y).reverse();
  const right = matrix[x].slice(y + 1);
  const col = getColumn(matrix, y);
  const top = col.slice(0, x).reverse();
  const bottom = col.slice(x + 1);

  return [left, right, top, bottom].reduce(
    (acc, line) => acc * countVisible(value, line),
    1
  );
};

const getScenicScores = (input) =>
  input.reduce(
    (acc, l, x) => [...acc, ...l.map((_, y) => getScenicScore(x, y, input))],
    []
  );

const task1 = (input) => getVisible(input).length;

const task2 = (input) => Math.max(...getScenicScores(input));

run(parse, task1, task2, true);
