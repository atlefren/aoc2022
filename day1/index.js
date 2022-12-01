const { run } = require("../run");
const { sum } = require("../util");

const parse = (i) => parseInt(i);

const sumGroups = (input) =>
  input.reduce(
    (acc, el) =>
      isNaN(el) ? [...acc, 0] : [...acc.slice(0, -1), acc.at(-1) + el],
    [0]
  );

const sumTopN = (input, n) =>
  sum([...sumGroups(input)].sort((a, b) => b - a).slice(0, n));

const task1 = (input) => sumTopN(input, 1);

const task2 = (input) => sumTopN(input, 3);

run(parse, task1, task2, true);
