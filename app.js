const controller = document.querySelector(".controller");
const pointerContainer = document.querySelector(".pointer-container");
const text = document.querySelector(".text");
const breathCount = document.querySelector(".breath-count");
const btn = document.querySelector(".btn");
const title = document.querySelector(".title");
const img = document.querySelector(".img");
const timer = document.querySelector(".timer");

const totalTime = 11000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
let active = false;
let counter = 0;
let hold;
let breathOut;
let loop;
let time;
let timeLoop;

const breathAnimation = () => {
  text.innerText = "Inspiration";
  controller.className = "controller grow";
  hold = setTimeout(() => {
    text.innerText = "Pause";
    breathOut = setTimeout(() => {
      text.innerText = "Expiration";
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
    clearInterval(loop);
    clearInterval(timeLoop);
  } else {
    active = true;
    counter = 0;
    time = 0;
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
  loop = setInterval(() => {
    breathAnimation();
    counter += 1;
    counter == 1
      ? (breathCount.innerHTML = `<p><span>${counter}</span></p><p>Breathing completed</p>`)
      : (breathCount.innerHTML = `<p><span>${counter}</span></p><p>Breathings completed!</p>`);
  }, totalTime);
};

const incrementTimer = () => {
  time += 1;
  timer.innerText = `${time} s`;
};

const startTimer = () => {
  timeLoop = setInterval(incrementTimer, 1000);
};
