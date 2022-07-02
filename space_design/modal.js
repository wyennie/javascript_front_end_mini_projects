document.addEventListener('DOMContentLoaded', function(event) {
  let ul = document.querySelector('article ul');
  let modal = document.getElementById('modal');

  ul.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.tagName !== 'A') { return; }

    modal.style.display = "inline";
  });
});
