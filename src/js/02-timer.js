import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');


btnStart.disabled = true;

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
     const selected = selectedDates[0].getTime();
     if (selected < options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
     } else {
       btnStart.disabled = false;
       return selectedDate = selectedDates[0];
     }
   },
 };

function convertMs(ms) {
   // Number of milliseconds per unit of time
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
   // Remaining days
   const days = Math.floor(ms / day);
   // Remaining hours
   const hours = Math.floor((ms % day) / hour);
   // Remaining minutes
   const minutes = Math.floor(((ms % day) % hour) / minute);
   // Remaining seconds
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
   return { days, hours, minutes, seconds };
 }

 flatpickr(input, options);

 function addLeadingZero(value) {
   if (value < 10) {
     return value.toString().padStart(2, '0');
   } else {
     return value;
   }
 }

const getDifference = () => {
  const todayTime = new Date().getTime();
  const difference = selectedDate.getTime() - todayTime;

  if (difference < 1000) {
    clearInterval(timerId);
  }
  const resultDays = convertMs(difference).days;
  days.textContent = addLeadingZero(resultDays);

  const resultHours = convertMs(difference).hours;
  hours.textContent = addLeadingZero(resultHours);

  const resultMinutes = convertMs(difference).minutes;
  minutes.textContent = addLeadingZero(resultMinutes);

  const resultSeconds = convertMs(difference).seconds;
  seconds.textContent = addLeadingZero(resultSeconds);
};

let timerId = null;
btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  getDifference();
  timerId = setInterval(() => {
    getDifference();
  }, 1000);
});
