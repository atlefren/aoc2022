const { run, compare } = require("../run");
const { chunks, range } = require("../util");
const parse = (i) => i;

const getStacks = (input) =>
  input
    .slice(0, -1)
    .map((line) =>
      [...chunks(line.split(""), 4)].map((c) =>
        c[1] === " " ? undefined : c[1]
      )
    )
    .reverse();

const rearrangeStacks = (numbers, stacks) =>
  range(stacks.length).reduce(
    (acc, i) =>
      numbers.reduce(
        (a, num) => ({
          ...a,
          [num]:
            stacks[i][num - 1] !== undefined
              ? [...a[num], stacks[i][num - 1]]
              : a[num],
        }),
        acc
      ),
    numbers.reduce((acc, n) => ({ ...acc, [n]: [] }), {})
  );

const getCrateNumbers = (input) =>
  input
    .at(-1)
    .split(" ")
    .filter((e) => e !== "")
    .map((e) => parseInt(e, 10));

const parseCrates = (input) =>
  rearrangeStacks(getCrateNumbers(input), getStacks(input));

const idexes = ["num", "from", "to"];
const parseMove = (move) =>
  move
    .split(" ")
    .map((e) => parseInt(e, 10))
    .filter((e) => !isNaN(e))
    .reduce((acc, e, i) => ({ ...acc, [idexes[i]]: e }), {});

const getCrates = (input) => parseCrates(input.slice(0, input.indexOf("")));
const getMoves = (input) => input.slice(input.indexOf("") + 1).map(parseMove);

const copyTo = (crates, from, to, num, moveSingle) =>
  moveSingle
    ? [...crates[to], ...crates[from].slice(-num).reverse()]
    : [...crates[to], ...crates[from].slice(-num)];

const executeMove = (moveSingle) => (crates, move) => ({
  ...crates,
  [move.from]: crates[move.from].slice(0, -move.num),
  [move.to]: copyTo(crates, move.from, move.to, move.num, moveSingle),
});

const getTopCrates = (crates) =>
  Object.keys(crates)
    .map((key) => crates[key].at(-1))
    .join("");

const runCrane = (input, execute) =>
  getTopCrates(getMoves(input).reduce(execute, getCrates(input)));

const task1 = (input) => runCrane(input, executeMove(true));

const task2 = (input) => runCrane(input, executeMove(false));

run(parse, task1, task2, true);
compare(parse, task1, task2, {
  task1Test: "CMZ",
  task1: "GFTNRBZPF",
  task2Test: "MCD",
  task2: "VRQWPDSGP",
});
