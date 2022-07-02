/*
The goal of this assignment is to create a guessing game that asks the player
to guess an integer between 1 and 100 chosen by the computer. The program first
picks a random value using a random number generator. The player then enters
her guess and submits it, and the program checks whether the guess is higher,
lower, or equal to the computer's chosen number, and reports the result. The
player may continue to play until she guesses the number.

*/
document.addEventListener('DOMContentLoaded', () => {
  let answer =  Math.floor(Math.random() * 100) + 1;
  let form = document.querySelector('form');
  let input = form.querySelector('input');
  let button = input.nextElementSibling;
  let p = document.querySelector('p');
  let a = document.querySelector('a');

  form.addEventListener('submit', e => {
    e.preventDefault();

    let guess = parseInt(input.value, 10);
    let message;

    if (Number.isNaN(guess)) {
      message = "Guess numbers only"
    } else if (guess > answer) {
      message = `My number is lower than ${guess}`
    } else if (guess < answer) {
      message = `My number is higher than ${guess}`
    } else {
      message = `${guess} is my number!!!`
      button.disabled = true;
    }

    p.textContent = message;
  });

  a.addEventListener('click', e => {
    e.preventDefault();
    answer = Math.floor(Math.random() * 100) + 1;
    p.textContent = "Guess a new number";
    button.disabled = false;
  });
});