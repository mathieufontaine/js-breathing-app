import { startAudio, stopAudio } from "./audio.js";
import { pad } from "./timer.js";

const pointerContainer = document.querySelector(".pointer-container");
const breathCount = document.querySelector(".breath-count");
const command = document.querySelector(".command");
const resume = document.querySelector(".resume");
const controller = document.querySelector(".controller");
const text = document.querySelector(".text");
const content = document.querySelector(".content");
const overlay = document.querySelector(".overlay");
const timer = document.querySelector(".timer");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

const totalTime = 11000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

let active = false;
let counter = 0;
let controllerLoop;
let hold;
let breathOut;

let timeLoop;
let totalSeconds;

let audioTheme = document.querySelector("#zen");

export const commandHandler = () => {
  if (active == true) {
    active = false;
    text.innerText = "Get Ready";
    controller.className = "controller";
    command.innerText = "Start Again";
    clearTimeout(hold);
    clearTimeout(breathOut);
    clearInterval(controllerLoop);
    clearInterval(timeLoop);
    stopAudio(audioTheme);
    resume.style.display = "block";
  } else {
    active = true;
    counter = 0;
    totalSeconds = 0;
    minutes.innerText = "00 :";
    seconds.innerText = "00";
    breathCount.innerHTML = "";
    command.innerText = "Stop";
    // title.className = "title small-title";
    // img.className = "img small-img";
    timer.style.visibility = "visible";
    resume.style.display = "none";
    breathAnimation();
    startTimer();
    startAudio(audioTheme);
    startLoop();
  }
  pointerContainer.classList.toggle("rotate");
  command.classList.toggle("active");
};

export const resumeHandler = () => {
  active = true;
  command.innerText = "Stop";
  breathAnimation();
  startAudio(audioTheme);
  startTimer();
  startLoop();
  pointerContainer.classList.toggle("rotate");
  command.classList.toggle("active");
  resume.style.display = "none";
};

export const themeHandler = () => {
  if (theme.className == "zen") {
    theme.innerHTML = "<span>Forest</span>";
    theme.className = "forest";
    audioTheme = document.querySelector("#forest");
    content.className = "content forest-bg";
    overlay.style.opacity = 0.2;
    if (active == true) {
      stopAudio(zen);
      startAudio(audioTheme);
    }
  } else if (theme.className == "forest") {
    theme.innerHTML = "<span>Beach</span>";
    theme.className = "beach";
    audioTheme = document.querySelector("#beach");
    content.className = "content beach-bg";
    if (active == true) {
      stopAudio(forest);
      startAudio(audioTheme);
    }
  } else {
    theme.innerHTML = "<span>Zen</span>";
    theme.className = "zen";
    audioTheme = document.querySelector("#zen");
    content.className = "content";
    if (active == true) {
      stopAudio(beach);
      startAudio(audioTheme);
    }
  }
};

const startLoop = () => {
  controllerLoop = setInterval(() => {
    breathAnimation();
    counter += 1;
    counter == 1
      ? (breathCount.innerHTML = `<p><span>${counter}</span></p><p>Breathing completed</p>`)
      : (breathCount.innerHTML = `<p><span>${counter}</span></p><p>Breathings completed!</p>`);
  }, totalTime);
};

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

const startTimer = () => {
  timeLoop = setInterval(setTime, 1000);
};

const setTime = () => {
  ++totalSeconds;
  seconds.innerText = `${pad(totalSeconds % 60)}`;
  minutes.innerText = `${pad(parseInt(totalSeconds / 60))} :`;
};
