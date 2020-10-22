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
const theme = document.querySelector("#theme");
const content = document.querySelector(".content");
const overlay = document.querySelector(".overlay");

console.log(theme.className);

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
let audioTheme = document.querySelector("#zen");

const enableLoop = audio => {
  audio.loop = true;
  audio.load();
};

const startAudio = audio => {
  enableLoop(audio);
  audio.play();
};

const stopAudio = audio => {
  audio.pause();
  audio.currentTime = 0;
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

theme.addEventListener("click", () => {
  if (theme.className == "zen") {
    theme.innerText = "Forest";
    theme.className = "forest";
    audioTheme = document.querySelector("#forest");
    content.className = "content forest-bg";
    overlay.style.opacity = 0.2;
  } else if (theme.className == "forest") {
    theme.innerText = "Beach";
    theme.className = "beach";
    audioTheme = document.querySelector("#beach");
    content.className = "content beach-bg";
  } else {
    theme.innerText = "Zen";
    theme.className = "zen";
    audioTheme = document.querySelector("#zen");
    content.className = "content";
  }
});

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
    stopAudio(audioTheme);
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
    breathAnimation();
    startTimer();
    startAudio(audioTheme);
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
