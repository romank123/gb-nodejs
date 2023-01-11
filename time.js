class Time {
  constructor(timeString) {
    this.time = timeString;
  }

  timeToSeconds() {
    let [hour, day, month, year] = this.time.split("-");

    if (year.toString().length === 2) {
      year = Number(`20${year}`);
    }

    const date = new Date(year, month - 1, day, hour);
    return date.getTime();
  }
}

module.exports = Time;
