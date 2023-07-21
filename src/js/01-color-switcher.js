function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;

let intervalId;

function onStartButtonClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
}

function onStopButtonClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalId);
}

startBtn.addEventListener('click', onStartButtonClick);
stopBtn.addEventListener('click', onStopButtonClick);
