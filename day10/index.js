const { run } = require("../run");

const parseOp = ([op, arg]) => ({
  op,
  arg: arg ? parseInt(arg, 10) : undefined,
});

const parse = (i) => parseOp(i.split(" "));

var closest = (counts, goal) =>
  counts.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );

const isCycle = (acc, op) =>
  op === "addx"
    ? acc.cycles.includes(acc.cycle) || acc.cycles.includes(acc.cycle + 1)
    : acc.cycles.includes(acc.cycle) || acc.cycles.includes(acc.cycle + 1);

const execute = (program) =>
  program.reduce(
    (acc, { op, arg }) => {
      //console.log(op, arg);
      if (acc.cycles.includes(acc.cycle + 1)) {
        const c = acc.cycle + 1;
        acc.cycles = acc.cycles.filter((cv) => cv !== c);
        acc.strength += c * acc.value;
      }

      if (op === "noop") {
        return { ...acc, cycle: acc.cycle + 1 };
      }
      if (op === "addx") {
        return { ...acc, value: acc.value + arg, cycle: acc.cycle + 1 };
      }
      return acc;
    },
    { value: 1, cycle: 0, strength: 0, cycles: [20, 60, 100, 140, 180, 220] }
  );

const isLit = (x, sprite) =>
  x === sprite || x === sprite - 1 || x === sprite + 1;

const execute2 = (program) =>
  program.reduce(
    (acc, { op, arg }, i) => {
      const x = i % 40;
      if (x === 0) {
        acc.rows.push([]);
      }

      acc.rows.at(-1).push(isLit(x, acc.value) ? "#" : ".");

      if (acc.cycles.includes(acc.cycle + 1)) {
        const c = acc.cycle + 1;
        acc.cycles = acc.cycles.filter((cv) => cv !== c);
        acc.strength += c * acc.value;
      }

      if (op === "noop") {
        return { ...acc, cycle: acc.cycle + 1 };
      }
      if (op === "addx") {
        return { ...acc, value: acc.value + arg, cycle: acc.cycle + 1 };
      }
      return acc;
    },
    {
      value: 1,
      cycle: 0,
      strength: 0,
      cycles: [20, 60, 100, 140, 180, 220],
      rows: [],
    }
  );

const task1 = (input) =>
  execute(
    input.reduce(
      (acc, l) => (l.op === "addx" ? [...acc, { op: "noop" }, l] : [...acc, l]),
      []
    )
  ).strength;

const task2 = (input) =>
  console.log(
    execute2(
      input.reduce(
        (acc, l) =>
          l.op === "addx" ? [...acc, { op: "noop" }, l] : [...acc, l],
        []
      )
    )
      .rows.map((r) => r.join(""))
      .join("\n")
  );

run(parse, task1, task2, true);
