const EventEmitter = require("events");
const Time = require("./time");
const Handler = require("./handler");

const lesson2 = () => {
  class TimeEmitter extends EventEmitter {}
  const emitter = new TimeEmitter();

  emitter.on("getTimers", Handler.handler.bind(Handler));

  Handler.interval = setInterval(() => emitter.emit("getTimers"), 1000);

  const args = process.argv.slice(2);

  args.forEach((item) => {
    Handler.setTimer(new Time(item));
  });
};

lesson2();
