export const startAudio = audio => {
  enableLoop(audio);
  audio.play();
};

export const stopAudio = audio => {
  audio.pause();
  audio.currentTime = 0;
};

const enableLoop = audio => {
  audio.loop = true;
  audio.load();
};
