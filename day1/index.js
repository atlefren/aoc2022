const { run } = require("../run");

const parse = (i) => parseInt(i);

const sum = (input) =>
  input.reduce(
    (acc, el) =>
      isNaN(el) ? [...acc, 0] : [...acc.slice(0, -1), acc.at(-1) + el],
    [0]
  );

const task1 = (input) => Math.max(...sum(input));

const task2 = (input) =>
  [...sum(input)]
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, e) => acc + e, 0);

run(parse, task1, task2, true);
