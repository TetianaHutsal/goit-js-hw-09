import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let countdownInterval = null;

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startButton.setAttribute('disabled', true);

function convertMsToTime(ms) {
  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;

  const days = Math.floor(ms / daysInMs);
  const hours = Math.floor((ms % daysInMs) / hoursInMs);
  const minutes = Math.floor(((ms % daysInMs) % hoursInMs) / minutesInMs);
  const seconds = Math.floor((((ms % daysInMs) % hoursInMs) % minutesInMs) / secondsInMs);

  return { days, hours, minutes, seconds };
}

function addLeadingZeros(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Пожалуйста, выберите дату в будущем');
      return;
    }
    startButton.removeAttribute('disabled');

    const updateTimerDisplay = () => {
      const now = new Date();
      localStorage.setItem('selectedDate', selectedDates[0]);
      const selectedDate = new Date(localStorage.getItem('selectedDate'));

      if (!selectedDate) return;

      const timeDiff = selectedDate - now;
      const { days, hours, minutes, seconds } = convertMsToTime(timeDiff);

      daysElement.textContent = addLeadingZeros(days);
      hoursElement.textContent = addLeadingZeros(hours);
      minutesElement.textContent = addLeadingZeros(minutes);
      secondsElement.textContent = addLeadingZeros(seconds);

      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(countdownInterval);
      }
    };

    const onClick = () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      updateTimerDisplay();
      countdownInterval = setInterval(updateTimerDisplay, 1000);
    };

    startButton.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });

// ____________style__________________
const fields = document.querySelectorAll('.field');
fields.forEach(field => {
  field.style.display = 'inline-block';
  field.style.textAlign = 'center';
  field.style.margin = '20px 20px';
  field.style.color = 'blue';
});

const labels = document.querySelectorAll('.label');
labels.forEach(label => {
  label.style.display = 'block';
  label.style.fontSize = '16px';
  label.style.marginTop = '20px';
  label.style.color = 'red';
});

const values = document.querySelectorAll('.value');
values.forEach(value => {
  value.style.fontSize = '24px';
  value.style.color = 'blue';
});


const input = document.getElementById('datetime-picker');
input.style.padding = '8px';
input.style.fontSize = '16px';
input.style.marginRight = '10px';

const button = document.querySelector('[data-start]');
button.style.padding = '8px 16px';
button.style.fontSize = '16px';
button.style.backgroundColor = '#4CAF50';
button.style.color = 'white';
button.style.border = 'none';
button.style.cursor = 'pointer';
