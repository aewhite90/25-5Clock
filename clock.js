let sessionTime = 25;
let breakTime = 5;
let counter = 0;
let isPaused = true;
let isBreak = true;
let countDown = 0;
let duration = sessionTime * 60;

const alarm = document.createElement('audio');
alarm.setAttribute('src','alarm.mp3');

window.setInterval(updateHTML, 100)

function reset() {
  sessionTime = 25;
  breakTime = 5;
  minutes = 25;
  seconds = 0;
  duration = sessionTime * 60;
  isBreak = true;
  isPaused = true;
  clearInterval(countDown);
  document.getElementById('time-left').innerHTML = '25:00';
  document.getElementById('break-length').innerHTML = 5;
  document.getElementById('session-length').innerHTML = 25;
}

function breakLength(value) {
  breakTime += value;
  if (breakTime < 1) {
    breakTime = 1;
  } else if (breakTime > 60) {
    breakTime = 60;
  }
  document.getElementById('break-length').innerHTML = breakTime;
}

function sessionLength(value) {
  sessionTime += value;
  if (sessionTime < 1) {
    sessionTime = 1;
  } else if (sessionTime > 60) {
    sessionTime = 60;
  }
  duration = sessionTime * 60;
  document.getElementById('time-left').innerHTML = sessionTime + ':00';
  document.getElementById('session-length').innerHTML = sessionTime;
}

function start_stop() {
  clearInterval(countDown);
  isPaused = !isPaused;
  if (!isPaused) {
    countDown = setInterval(timer, 1000);
  }
}

function timer() {
  duration = duration - 1;
  if (duration < 0) {
    clearInterval(countDown)
    duration = (isBreak ? breakTime : sessionTime) * 60;
    alarm.currentTime = 0;
    alarm.play();
    isBreak = !isBreak;
    countDown = setInterval(timer, 1000);
  }
}

function updateHTML() {
  let minutes = Math.floor(duration/60);
  let seconds = duration % 60;
  document.getElementById('time-left').innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  if (!isBreak) {
    document.getElementById('timer-label').innerHTML = "Break Time!"
  }
}
