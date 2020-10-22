const controller = document.querySelector(".controller");
const pointerContainer = document.querySelector(".pointer-container");
const text = document.querySelector(".text");
const breathCount = document.querySelector(".breath-count");
const btn = document.querySelector(".btn");
const title = document.querySelector(".title");
const img = document.querySelector(".img");
const timer = document.querySelector(".timer");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

const totalTime = 11000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
let active = false;
let counter = 0;
let hold;
let breathOut;
let controllerLoop;
let totalSeconds;
let timeLoop;

const breathAnimation = () => {
  text.innerText = "Breath In";
  controller.className = "controller grow";
  hold = setTimeout(() => {
    text.innerText = "Hold";
    breathOut = setTimeout(() => {
      text.innerText = "Breath Out";
      controller.className = "controller shrink";
    }, holdTime);
  }, breatheTime);
};

btn.addEventListener("click", () => {
  if (active == true) {
    active = false;
    text.innerText = "Get Ready";
    controller.className = "controller";
    btn.innerText = "Start Again";
    clearTimeout(hold);
    clearTimeout(breathOut);
    clearInterval(controllerLoop);
    clearInterval(timeLoop);
  } else {
    active = true;
    counter = 0;
    totalSeconds = 0;
    minutes.innerText = "00 :";
    seconds.innerText = "00";
    breathCount.innerHTML = "";
    btn.innerText = "Stop";
    title.className = "title small-title";
    img.className = "img small-img";
    startTimer();
    breathAnimation();
    startLoop();
  }
  pointerContainer.classList.toggle("rotate");
  btn.classList.toggle("active");
});

const startLoop = () => {
  controllerLoop = setInterval(() => {
    breathAnimation();
    counter += 1;
    counter == 1
      ? (breathCount.innerHTML = `<p><span>${counter}</span></p><p>Breathing completed</p>`)
      : (breathCount.innerHTML = `<p><span>${counter}</span></p><p>Breathings completed!</p>`);
  }, totalTime);
};

const setTime = () => {
  ++totalSeconds;
  seconds.innerText = `${" "}${pad(totalSeconds % 60)}`;
  minutes.innerText = `${pad(parseInt(totalSeconds / 60))} :${" "}`;
};

const pad = val => {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
};

const startTimer = () => {
  timeLoop = setInterval(setTime, 1000);
};
