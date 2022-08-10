import Notiflix from 'notiflix';

const Btn = document.querySelector('button');
const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
  return promise;
};

Btn.addEventListener('click', event => {
  event.preventDefault();

  const inputDelay = Number(form.elements.delay.value);
  const inputStep = Number(form.elements.step.value);
  const inputAmount = Number(form.elements.amount.value);

  for (let i = 1; i <= inputAmount; i++){

   const actualyTime = inputDelay + inputStep * (i-1);
   
    createPromise(i, actualyTime)
      .then(({ position, delay }) => {
         Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`)
      })
      .catch(({ position, delay }) => {
         Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`)
      })
  }
});