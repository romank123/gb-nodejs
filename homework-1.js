const colors = require("colors/safe");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Введите начало диапазона ", (begin) => {
  rl.question("Введите конец диапазона ", (end) => {
    if (isNumeric(begin) && isNumeric(end)) {
      getSimpleCount(parseInt(begin), parseInt(end));
    } else {
      console.log(
        "Ошибка! При вводе аргументов одно из указаных значений не является числом"
      );
      rl.close();
    }
  });
});

function getSimpleCount(begin, end) {
  let n = end;
  let count = 1;

  for (let i = begin; i <= n; i++) {
    let flag = 1;
    if (i > 2 && i % 2 != 0) {
      for (let j = 3; j * j <= i; j = j + 2) {
        if (i % j == 0) {
          flag = 0;
          break;
        }
      }
    } else if (i != 2) flag = 0;

    if (flag == 1) {
      if (count === 4) {
        count = 1;
      }
      switch (count) {
        case 1: {
          console.log(colors.green(i));
          break;
        }
        case 2: {
          console.log(colors.yellow(i));
          break;
        }
        case 3: {
          console.log(colors.red(i));
          break;
        }
        default:
          break;
      }
      count++;
    }
  }
  if (count === 1) {
    console.log(colors.red("Во введенном диапазоне нет простых чисел"));
  }
  rl.close();
}

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
