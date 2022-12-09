const { run } = require("../run");
const { range, uniq } = require("../util");

const parse = (i) => i.split(" ");

const getKnots = (num) => range(num).map((_) => [0, 0]);

const stepHead = (pos, dir, step) => {
  if (dir === "R") {
    return [pos[0] + step, pos[1]];
  }
  if (dir === "L") {
    return [pos[0] - step, pos[1]];
  }
  if (dir === "U") {
    return [pos[0], pos[1] + step];
  }
  if (dir === "D") {
    return [pos[0], pos[1] - step];
  }
};

const isTouching = (tail, head) =>
  Math.abs(tail[0] - head[0]) < 2 && Math.abs(tail[1] - head[1]) < 2;

const moveTail = (tail, head) => {
  if (isTouching(tail, head)) {
    return tail;
  }
  const diffx = head[0] - tail[0];
  const diffy = head[1] - tail[1];

  if (diffx === 0 || diffy === 0) {
    if (diffx !== 0) {
      return [tail[0] + (diffx > 0 ? 1 : -1), tail[1]];
    }
    if (diffy !== 0) {
      return [tail[0], tail[1] + (diffy > 0 ? 1 : -1)];
    }
  }

  return [tail[0] + (diffx > 0 ? 1 : -1), tail[1] + (diffy > 0 ? 1 : -1)];
};

const moveDirection = (pos, dir) => {
  return pos
    .slice(1)
    .reduce(
      (acc, tail) => [...acc, moveTail(tail, acc.at(-1))],
      [stepHead(pos[0], dir, 1)]
    );
};

const move = (pos, dir) => moveDirection(pos.at(-1), dir);

const getSteps = (input) =>
  input
    .map((e) => [e[0], parseInt(e[1])])
    .reduce((acc, o) => [...acc, ...range(o[1]).map((_) => o[0])], []);

const simulate = (input, numKnots) =>
  uniq(
    getSteps(input)
      .reduce((acc, dir) => [...acc, move(acc, dir)], [getKnots(numKnots)])
      .map((p) => p.at(-1).join(","))
  ).length;

const task1 = (input) => simulate(input, 2);

const task2 = (input) => simulate(input, 10);

run(parse, task1, task2, true);
