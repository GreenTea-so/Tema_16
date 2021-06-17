function getRandom(min, max) {
    const resMin = Math.ceil(min);
    const resMax = Math.floor(max);
    return Math.floor(Math.random() * (resMax - resMin + 1)) + resMin;
  }

window.getRandom = getRandom