// creating panel title in js
const workTitle = document.getElementById("timer");
const breakTitle = document.getElementById("break");

// creating time
const workTime = 25;
const breakTime = 5;
const seconds = "00";

// adding time in html
window.onload = function () {
  document.getElementById("minutes").innerHTML = workTime;
  document.getElementById("seconds").innerHTML = seconds;
};

// countdown timer starts

function start() {
  let workMinutes = workTime - 1;
  const breakMinutes = breakTime - 1;
  let seconds = 59;
  // let breakCount = 0;

  const timerFunction = function () {
    seconds -= 1;
    document.getElementById("minutes").innerHTML = workMinutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (seconds == 0) {
      workMinutes -= 1;
      seconds = 59;
      if (workMinutes == -1) {
        workMinutes = breakMinutes;
      }
    }
  };
  setInterval(timerFunction, 1000);
}

// if (breakCount % 2 == 0 ){
//     workMinutes = breakMinutes;
//     breakCount++
// }
// else{
//     workMinutes = workTime;
//     breakCount++
// }

//     if (workMinutes != -1){
//     workTitle.classList.add('active');
//     breakTitle.classList.remove('active');

// }
