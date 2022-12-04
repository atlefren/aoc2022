const { run, compare } = require("../run");
const { sum, chunks, uniq } = require("../util");

const getPriority = (char) =>
  char == char.toLowerCase()
    ? char.charCodeAt(0) - 96
    : char.charCodeAt(0) - 65 + 27;

const parse = (i) => i;

const split = (sack) =>
  [
    sack.slice(0, sack.length / 2),
    sack.slice(sack.length / 2, sack.length),
  ].map((s) => s.split(""));

const parseRucksack = ([part1, part2]) =>
  uniq([
    ...part1.filter((e) => part2.includes(e)),
    ...part2.filter((e) => part1.includes(e)),
  ])[0];

const task1 = (input) =>
  sum(input.map(split).map(parseRucksack).map(getPriority));

const getShared = (group) =>
  uniq(
    group[0]
      .split("")
      .filter((e) => group[1].split("").includes(e))
      .filter((e) => group[2].split("").includes(e))
  )[0];

const task2 = (input) =>
  sum([...chunks(input, 3)].map(getShared).map(getPriority));

run(parse, task1, task2, true);
compare(parse, task1, task2, {
  task1Test: 157,
  task1: 8139,
  task2Test: 70,
  task2: 2668,
});
