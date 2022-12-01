const readFile = require("./readFile");

const run = async (parse, task1, task2, runAll = true, split = "\n") => {
  const testInput = await readFile("testinput.txt", parse, split);
  const input = await readFile("input.txt", parse, split);

  console.log(
    JSON.stringify(
      {
        task1Test: task1(testInput),
        task1: runAll ? task1(input) : "not now",
        task2Test: task2(testInput),
        task2: runAll ? task2(input) : "not now",
      },
      undefined,
      4
    )
  );
};

module.exports = { run };
