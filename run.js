const readFile = require("./readFile");

const execute = async (parse, task1, task2, runAll = true, split = "\n") => {
  const testInput = await readFile("testinput.txt", parse, split);
  const input = await readFile("input.txt", parse, split);

  return {
    task1Test: task1(testInput),
    task1: runAll ? task1(input) : "not now",
    task2Test: task2(testInput),
    task2: runAll ? task2(input) : "not now",
  };
};

const run = async (parse, task1, task2, runAll = true, split = "\n") =>
  console.log(
    JSON.stringify(
      await execute(parse, task1, task2, runAll, split),
      undefined,
      4
    )
  );

const compare = async (
  parse,
  task1,
  task2,
  answer,
  runAll = true,
  split = "\n"
) => {
  const result = await execute(parse, task1, task2, runAll, split);
  console.log(`Task1 Test: ${result.task1Test === answer.task1Test}`);
  console.log(`Task1: ${result.task1 === answer.task1}`);
  console.log(`Task2 Test: ${result.task2Test === answer.task2Test}`);
  console.log(`Task2: ${result.task2 === answer.task2}`);
};

module.exports = { run, compare };
