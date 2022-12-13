const { run } = require("../run");

const parse = (i) => i;

const readPairs = (input) =>
  input.reduce(
    (acc, l) =>
      l === ""
        ? [...acc, []]
        : [...acc.slice(0, -1), [...acc.at(-1), JSON.parse(l)]],
    [[]]
  );

const compare = (left, right) => {
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const l = left[i];
    const r = right[i];
    if (l !== undefined && r !== undefined) {
      const numArrays = [l, r].filter((a) => Array.isArray(a)).length;
      if (numArrays === 0) {
        if (l < r) {
          return true;
        }
        if (l > r) {
          return false;
        }
      } else {
        const res = compare(
          ...[l, r].map((e) => (!Array.isArray(e) ? [e] : e))
        );
        if (res !== undefined) {
          return res;
        }
      }
    }
  }
  if (left.length === right.length) {
    return undefined;
  }
  return left.length < right.length;
};

const task1 = (input) =>
  readPairs(input)
    .map((pair, i) => ({
      i: i + 1,
      res: compare(...pair),
    }))
    .filter(({ res }) => res)
    .reduce((acc, { i }) => acc + i, 0);

const getPackets = (input) => [
  ...input.filter((l) => l !== "").map(JSON.parse),
  [[2]],
  [[6]],
];

const getPacketIndex = (lst, packet) =>
  lst.findIndex((e) => JSON.stringify(e) === packet) + 1;

const task2 = (input) => {
  const sorted = getPackets(input).sort((a, b) => (compare(a, b) ? -1 : 1));
  return getPacketIndex(sorted, "[[2]]") * getPacketIndex(sorted, "[[6]]");
};

run(parse, task1, task2, true);
