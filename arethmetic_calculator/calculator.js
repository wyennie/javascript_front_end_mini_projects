document.addEventListener('DOMContentLoaded', function(event) {
  let answer = document.getElementById('answer');
  let form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let finalAnswer = 0;
    let operator = document.getElementById('operator').value;
    let number1 = parseInt(document.getElementById('number1').value, 10);
    let number2 = parseInt(document.getElementById('number2').value, 10);

    switch (operator) {
      case '+':
        finalAnswer = number1 + number2;
        break;
      case '-':
        finalAnswer = number1 - number2;
        break;
      case '*':
        finalAnswer = number1 * number2;
        break;
      case '/':
        finalAnswer = number1 / number2;
        break;
    }

    answer.textContent = finalAnswer;
  });
});
