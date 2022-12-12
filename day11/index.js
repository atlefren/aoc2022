const { run, compare } = require("../run");
const { range } = require("../util");

const parse = (i) => i;

const parseMonkey = (data) => {
  return {
    id: parseInt(data[0].replace("Monkey ", "").replace(":", "")),
    items: data[1]
      .replace("  Starting items: ", "")
      .split(", ")
      .map((i) => parseInt(i, 10)),
    operation: data[2].replace("  Operation: ", ""),
    divisibleBy: parseInt(data[3].replace("  Test: divisible by ", ""), 10),
    ifTrue: parseInt(data[4].replace("    If true: throw to monkey ", ""), 10),
    ifFalse: parseInt(
      data[5].replace("    If false: throw to monkey ", ""),
      10
    ),
    numInspections: 0,
  };
};

const getMonkeys = (input) =>
  input
    .reduce(
      (acc, l) => {
        if (l === "") {
          acc.push([]);
        } else {
          acc.at(-1).push(l);
        }
        return acc;
      },
      [[]]
    )
    .map(parseMonkey);

const getNewWorryLevel = (formula, current) =>
  eval(
    formula
      .replace("new = ", "")
      .split(" ")
      .map((v) =>
        v === "old" ? current : v === "+" || v === "*" ? v : parseInt(v, 10)
      )
      .join(" ")
  );

const getBored = (level) => Math.floor(level / 3);

const play = (monkeys, divideByThree = true) => {
  const div = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b);

  monkeys.forEach((monkey) => {
    while (monkey.items.length) {
      const item = monkey.items.shift();
      const newLevel = getNewWorryLevel(monkey.operation, item);

      const newLevel2 = Math.floor(
        divideByThree ? getBored(newLevel) : newLevel
      );
      const newLevel3 = divideByThree ? newLevel2 : newLevel2 % div;
      if (newLevel3 % monkey.divisibleBy === 0) {
        monkeys[monkey.ifTrue].items.push(newLevel3);
      } else {
        monkeys[monkey.ifFalse].items.push(newLevel3);
      }
      monkey.numInspections += 1;
    }
  });
  return monkeys;
};

const getTopTwo = (res) => {
  const [one, two] = res.map((m) => m.numInspections).sort((a, b) => b - a);
  return [one, two];
};

const playRounds = (input, rounds, getBored) =>
  getTopTwo(
    range(rounds).reduce((acc, _) => play(acc, getBored), getMonkeys(input))
  ).reduce((acc, el) => acc * el);

const task1 = (input) => playRounds(input, 20, true);

const task2 = (input) => playRounds(input, 10000, false);

//run(parse, task1, task2, true);
compare(
  parse,
  task1,
  task2,
  {
    task1Test: 10605,
    task1: 151312,
    task2Test: 2713310158,
    task2: 51382025916,
  },
  true
);
