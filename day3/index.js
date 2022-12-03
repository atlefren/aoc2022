const { group } = require("console");
const { run } = require("../run");
const { sum, chunks } = require("../util");

const getPriority = (char) =>
  char == char.toLowerCase()
    ? char.charCodeAt(0) - 96
    : char.charCodeAt(0) - 65 + 27;

const parse = (i) => i;

const parseRucksack = (sack) => {
  const part1 = sack.slice(0, sack.length / 2).split("");
  const part2 = sack.slice(sack.length / 2, sack.length).split("");

  return [
    ...new Set([
      ...part1.filter((e) => part2.includes(e)),
      ...part2.filter((e) => part1.includes(e)),
    ]),
  ][0];
};

const task1 = (input) => sum(input.map(parseRucksack).map(getPriority));

const getShared = (group) =>
  [
    ...new Set(
      group[0]
        .split("")
        .filter((e) => group[1].split("").includes(e))
        .filter((e) => group[2].split("").includes(e))
    ),
  ][0];

const task2 = (input) =>
  sum([...chunks(input, 3)].map(getShared).map(getPriority));

run(parse, task1, task2, true);
