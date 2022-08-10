const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStart.addEventListener('click',() => {
   btnStart.disabled = true;
   btnStop.disabled = false;
   timer = setInterval(()=>{
      body.style.backgroundColor = `${getRandomHexColor()}`;
   },1000)
});

btnStop.addEventListener('click', () => {
   btnStart.disabled = false;
   btnStop.disabled = true;
   clearInterval(timer);
 });
 
