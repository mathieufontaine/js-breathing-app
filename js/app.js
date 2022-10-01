import { commandHandler, resumeHandler, themeHandler } from "./commands.js";

const command = document.querySelector(".command");
const resume = document.querySelector(".resume");
const theme = document.querySelector(".btn_theme");

command.addEventListener("click", commandHandler);
resume.addEventListener("click", resumeHandler);
theme.addEventListener("click", themeHandler);
