const { run } = require("../run");
const { range } = require("../util");

const getLastN = (input, i, num) =>
  range(num)
    .map((j) => j + i - num + 1)
    .map((i) => input[i]);

const isUnique = (input, i, num) =>
  new Set(getLastN(input, i, num)).size === num;

const findUnique = (num) => (input) =>
  input.findIndex((_, i) => (i < num - 1 ? false : isUnique(input, i, num))) +
  1;

run((i) => i, findUnique(4), findUnique(14), true, "");
