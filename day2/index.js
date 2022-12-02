const { run } = require("../run");
const { sum } = require("../util");
const parse = (i) => i.split(" ");

const mapping = {
  X: "A",
  Y: "B",
  Z: "C",
};
const scores = {
  A: 1,
  B: 2,
  C: 3,
};
const moves = ["A", "B", "C"];

const getByIdx = (idx) =>
  moves[((idx % moves.length) + moves.length) % moves.length];

const getWin = (m) => getByIdx(moves.indexOf(m) + 1);

const getLoss = (m) => getByIdx(moves.indexOf(m) - 1);

const comp = (a, b) => (a == b ? 3 : getWin(a) === b ? 6 : 0);

const getScore = (result, played) => result + scores[played];

const eval = (a, b) => getScore(comp(a, b), b);

const getAction = {
  X: getLoss,
  Y: (a) => a,
  Z: getWin,
};

const task1 = (input) => sum(input.map((l) => eval(l[0], mapping[l[1]])));

const task2 = (input) =>
  sum(input.map((l) => eval(l[0], getAction[l[1]](l[0]))));

run(parse, task1, task2, true);
