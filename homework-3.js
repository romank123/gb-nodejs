const fs = require("fs");

const readStream = fs.createReadStream("./access.log", "utf8");
const ip_1 = /89.123.1.41/;
const ip_2 = /34.48.240.111/;
const file_1 = "./89.123.1.41_requests.log";
const file_2 = "./34.48.240.111_requests.log";

const stream1 = fs.createWriteStream(file_1, { flags: "a", encoding: "utf8" });
const stream2 = fs.createWriteStream(file_2, { flags: "a", encoding: "utf8" });

let readed = 0;
var line = 0;
fs.stat("./access.log", (err, stats) => (line = stats.size / 50));
let counter = 1;
readStream.on("data", (chunk) => {
  let res = chunk.toString().split("\n");

  res.forEach((item) => {
    if (ip_1.test(item)) {
      stream1.write(item + "\n");
    }
    if (ip_2.test(item)) {
      stream2.write(item + "\n");
    }
  });
  readed = readed + 64 * 1024;
  if (readed > line * counter) {
    counter++;
    process.stdout.write(`*`);
  }
});

readStream.on("end", () => {
  console.log("Streamming done.");
});
