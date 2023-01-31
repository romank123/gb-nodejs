const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const {
  getFileNamesInDirectory,
  isFile,
  promptUser,
  yargsConf,
  transformChunks,
} = require("./libs.js");

const lesson4 = () => {
  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();
  const options = yargsConf();
  const search = new RegExp(`(.*${options.search}.*)`, "g");

  const showFileContents = async (filepath) => {
    if (isFile(filepath)) {
      return new Promise((resolve) => {
        const transformStream = transformChunks(search);
        const stream = fs.createReadStream(filepath, "utf-8");
        stream.on("end", resolve);
        stream.pipe(transformStream).pipe(process.stdout);
      });
    } else {
      const filesInPath = await getFileNamesInDirectory(filepath);
      const userInput = await promptUser(filesInPath);
      myEmitter.emit("changePath", path.join(filepath, userInput));
    }
  };

  myEmitter.on("changePath", (path) => {
    showFileContents(path).catch(console.log);
  });

  myEmitter.emit("changePath", options.path ?? process.cwd());
};

module.exports = lesson4;
