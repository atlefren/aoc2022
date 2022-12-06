const { run } = require("../run");
const { range, isUnique } = require("../util");

const getLastN = (input, i, num) =>
  range(num, i - num + 1).map((i) => input[i]);

const findUnique = (num) => (input) =>
  input.findIndex((_, i) =>
    i < num - 1 ? false : isUnique(getLastN(input, i, num))
  ) + 1;

run((i) => i, findUnique(4), findUnique(14), true, "");
