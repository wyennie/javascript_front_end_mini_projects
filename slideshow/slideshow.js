document.addEventListener('DOMContentLoaded', function(event) {
  let ul = document.querySelector('ul');
  let figure = document.querySelector('figure');
  ul.querySelector('img').classList.add('visible')

  ul.addEventListener('click', function(event) {
    event.preventDefault();
    let chosen = event.target;
    let activePic = chosen.cloneNode();
    let lastVisible = document.getElementsByClassName('visible')[0];
    
    if (chosen.classList.contains("visible")) { 
      return; 
    } else if (chosen.tagName === 'IMG') {
      lastVisible.classList.remove('visible');
      chosen.classList.add('visible');

      figure.querySelector('img').remove();
      figure.appendChild(activePic);
    }
  });
});