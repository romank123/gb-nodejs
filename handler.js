class Handler {
  static #timers = [];
  static interval = null;

  static setTimer(timer) {
    this.#timers.push(timer);
  }

  static #leftTimeToString(time) {
    const timer = {
      seconds: Math.floor((time / 1000) % 60),
      minutes: Math.floor((time / 1000 / 60) % 60),
      hours: Math.floor((time / (1000 * 60 * 60)) % 24),
      days: Math.floor(time / (1000 * 60 * 60 * 24)),
    };
    return `осталось ${timer.days} дней и ${timer.hours}:${timer.minutes}:${timer.seconds}`;
  }

  static handler() {
    const now = Date.now();
    if (!this.#timers.length) {
      console.log("Нет ни одного таймера!");
      clearInterval(this.interval);
    } else {
      this.#timers.forEach((target) => {
        const diffTime = target.timeToSeconds() - now;
        if (diffTime > 0) {
          console.log(target.time, Handler.#leftTimeToString(diffTime));
        } else {
          console.log(target.time, "закончил отсчет");
          this.#timers = this.#timers.filter((item) => item !== target);
        }
      });
    }
    console.log("__________________________________");
  }
}

module.exports = Handler;
