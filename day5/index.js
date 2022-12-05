const { run } = require("../run");
const { chunks, range } = require("../util");
const parse = (i) => i;

const parseCrates = (i) => {
  const numbers = i
    .at(-1)
    .split(" ")
    .filter((e) => e !== "")
    .map((e) => parseInt(e, 10));

  const stacks = i
    .slice(0, -1)
    .map((l) =>
      [...chunks(l.split(""), 4)].map((c) => (c[1] === " " ? undefined : c[1]))
    )
    .reverse();

  const meh = range(stacks.length).reduce(
    (acc, i) =>
      numbers.reduce(
        (a, num) => ({
          ...a,
          [num]: [...a[num], stacks[i][num - 1]],
        }),
        acc
      ),
    numbers.reduce((acc, n) => ({ ...acc, [n]: [] }), {})
  );

  return Object.keys(meh).reduce(
    (acc, k) => ({ ...acc, [k]: meh[k].filter((e) => e !== undefined) }),
    {}
  );
};

const idexes = ["num", "from", "to"];
const parseMove = (move) =>
  move
    .split(" ")
    .map((e) => parseInt(e, 10))
    .filter((e) => !isNaN(e))
    .reduce((acc, e, i) => ({ ...acc, [idexes[i]]: e }), {});

const transformInput = (i) => {
  const s = i.indexOf("");
  return {
    crates: parseCrates(i.slice(0, s)),
    moves: i.slice(s + 1).map(parseMove),
  };
};

const executeMove = (crates, move) => {
  for (let n = 0; n < move.num; n++) {
    crates[move.to].push(crates[move.from].pop());
  }
  return crates;
};

const executeMove2 = (crates, move) => {
  const moved = [];
  for (let n = 0; n < move.num; n++) {
    moved.push(crates[move.from].pop());
  }
  crates[move.to] = [...crates[move.to], ...moved.reverse()];
  return crates;
};

const runCrane = (input, execute) => {
  const { crates, moves } = transformInput(input);
  const a = moves.reduce(execute, crates);
  return Object.keys(a)
    .map((k) => a[k].at(-1))
    .join("");
};

const task1 = (input) => runCrane(input, executeMove);

const task2 = (input) => runCrane(input, executeMove2);

run(parse, task1, task2, true);
