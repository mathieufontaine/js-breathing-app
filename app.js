const timer = document.querySelector(".timer");
const pointerContainer = document.querySelector(".pointer-container");
const text = document.querySelector(".text");
const btn = document.querySelector(".btn");

const start = document.querySelector(".start");
const stop = document.querySelector(".stop");

const totalTime = 11000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
let active = false;
let counter = 0;

const breathAnimation = () => {
  text.innerText = "Breath In";
  timer.className = "timer grow";
  setTimeout(() => {
    text.innerText = "Hold";
    setTimeout(() => {
      text.innerText = "Breath Out";
      timer.className = "timer shrink";
      counter += 1;
    }, holdTime);
  }, breatheTime);
};

btn.addEventListener("click", () => {
  if (active == true) {
    text.innerText = "Get Ready";
    timer.className = "timer";
    btn.innerText = "Start";
    active = false;
  } else {
    active = true;
    breathAnimation();
    startInterval();
    s;
    btn.innerText = "Stop";
  }
  pointerContainer.classList.toggle("rotate");
  btn.classList.toggle("active");
});

const startInterval = () => {
  const interval = setInterval(() => {
    if (active == false) {
      clearInterval(interval);
    }
    breathAnimation();
  }, totalTime);
};
