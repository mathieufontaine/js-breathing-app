import { startAudio, stopAudio } from "./audio.js";
import { pad } from "./timer.js";

const pointerContainer = document.querySelector(".pointer-container");
const breathCount = document.querySelector(".breath-count");
const command = document.querySelector(".command");
const resume = document.querySelector(".resume");
const controller = document.querySelector(".controller");
const content = document.querySelector(".content");
const timer = document.querySelector(".timer");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const breathTexts = document.querySelectorAll(".text");
const breathready = document.querySelector(".ready");
const breathin = document.querySelector(".breathin");
const breathhold = document.querySelector(".breathhold");
const breathout = document.querySelector(".breathout");

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

const themes = ["zen", "forest", "beach"];
let activeTheme = themes[0];
let activeAudio = document.querySelector(`#${activeTheme}`);

export const commandHandler = () => {
  if (active == true) {
    active = false;
    resetText();
    controller.className = "controller";
    command.innerText = "Start Again";
    clearTimeout(hold);
    clearTimeout(breathOut);
    clearInterval(controllerLoop);
    clearInterval(timeLoop);
    stopAudio(activeAudio);
    resume.style.visibility = "visible";
  } else {
    active = true;
    counter = 0;
    totalSeconds = 0;
    minutes.innerText = "00 :";
    seconds.innerText = "00";
    breathCount.innerHTML = "";
    command.innerText = "Stop";
    timer.style.visibility = "visible";
    resume.style.visibility = "hidden";
    breathAnimation();
    startTimer();
    startAudio(activeAudio);
    startLoop();
  }
  pointerContainer.classList.toggle("rotate");
  command.classList.toggle("active");
};

export const resumeHandler = () => {
  active = true;
  command.innerText = "Stop";
  breathAnimation();
  startAudio(activeAudio);
  startTimer();
  startLoop();
  pointerContainer.classList.toggle("rotate");
  command.classList.toggle("active");
  resume.style.visibility = "hidden";
};

export const themeHandler = () => {
  const themeIndex = themes.indexOf(activeTheme);
  const nextTheme =
    themes[themeIndex + 1] !== undefined ? themes[themeIndex + 1] : themes[0];
  console.log(themeIndex, nextTheme);
  activeTheme = `${nextTheme}`;
  const prevAudio = activeAudio;
  activeAudio = document.querySelector(`#${nextTheme}`);
  content.className = `content ${nextTheme}`;
  if (active == true) {
    stopAudio(prevAudio);
    startAudio(activeAudio);
  }
};

const startLoop = () => {
  controllerLoop = setInterval(() => {
    breathAnimation();
    counter += 1;
    breathCount.innerHTML = `<p><span>${counter}</span></p><p>${
      counter === 1 ? "Breathings" : "Breathings"
    } completed</p>`;
  }, totalTime);
};

const resetText = () => {
  breathTexts.forEach((text) => {
    text.classList.remove("show");
  });
  breathready.classList.add("show");
};

const breathAnimation = () => {
  breathout.classList.remove("show");
  breathready.classList.remove("show");
  breathin.classList.add("show");
  controller.className = "controller grow";
  hold = setTimeout(() => {
    breathin.classList.remove("show");
    breathhold.classList.add("show");
    breathOut = setTimeout(() => {
      breathhold.classList.remove("show");
      breathout.classList.add("show");
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
