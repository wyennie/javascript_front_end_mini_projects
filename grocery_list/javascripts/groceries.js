document.addEventListener('DOMContentLoaded', function(event) {
  let form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name');
    let quantity = document.getElementById('quantity');
    let list = document.getElementById('grocery-list');
    if (!name.value) {
      alert('Please input Name');
      return;
    }

    let li = document.createElement('li');
    li.textContent = validQuantity(quantity.value) + ' ' + name.value;
    list.appendChild(li);
    form.reset();
  });
});

function validQuantity(input) {
  let num = parseInt(input, 10);
  if (!num || num < 1) { num = 1; }
  return num;
}