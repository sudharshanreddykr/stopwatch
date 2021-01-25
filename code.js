


function StopWatch() {

  var startTime = 0,
    elapsedTime = 0; 

 
  var start = function() {
    if (startTime === 0) {
      startTime = Date.now();
    }
  };

  var pause = function() {
    elapsedTime = startTime ? (elapsedTime + Date.now() - startTime) : elapsedTime;
    startTime = 0;
  }


  var reset = function() {
    startTime = 0;
    elapsedTime = 0;
  }


  var timeSinceStarted = function() {
    return elapsedTime + (startTime ? (Date.now() - startTime) : 0);
  }


  return {
    start: start,
    pause: pause,
    reset: reset,
    timeSinceStarted: timeSinceStarted
  };
}


// DOM Elements
var clockFace = document.getElementById('clock-face'),
  startButton = document.getElementById('start'),
  pauseButton = document.getElementById('pause'),
  resetButton = document.getElementById('reset');

var stopWatch = new StopWatch();
var interval,
  intervalTime = 1,
  formatTimeSize = 2,
  timerRunning = false;

var initializeWatch = function() {
  startButton.innerHTML = "Start";
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  timerRunning = false;
  interval = null;
  clockFace.innerHTML = formatTime(0);
}

var startTimer = function() {
  if (!timerRunning) {
    console.log("Timer started!");
    interval = setInterval(function() {
      clockFace.innerHTML = formatTime(stopWatch.timeSinceStarted());
    }, intervalTime);
    stopWatch.start();
    timerRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
  }
}

var pauseTimer = function() {
  if (timerRunning) {
    console.log("Timer paused.");
    stopWatch.pause();
    clearInterval(interval);
    interval = null;
    timerRunning = false;
    startButton.innerHTML = "Resume";
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = false;
  }
}

var resetTimer = function() {
  console.log("Timer reset.");
  stopWatch.pause();
  stopWatch.reset();
  clearInterval(interval);
  initializeWatch();
}

var formatTime = function(time) {
  var hours = addLeadingZero(Math.floor(time / (60 * 60 * 1000)), formatTimeSize);
  time %= (60 * 60 * 1000);
  var minutes = addLeadingZero(Math.floor(time / (60 * 1000)), formatTimeSize);
  time %= (60 * 1000);
  var seconds = addLeadingZero(Math.floor(time / 1000), formatTimeSize);
  var milliseconds = addLeadingZero(time % 1000, 2);
  return hours + "h : " + minutes + "m : " + seconds + "s : " + milliseconds + "ms ";
}

var addLeadingZero = function(time, size) {
  var appendedTime = "0000" + time;
  return appendedTime.substring(appendedTime.length - size);
}


startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);