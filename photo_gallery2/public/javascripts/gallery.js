let renderPage = async function() {
  let response = await fetch('/photos');
  let photos = await response.json();

  let id = photos[0].id;
  let commentResponse = await fetch(`/comments?photo_id=${id}`);
  let comments = await commentResponse.json();

  renderPhotos(0);
  renderComments(comments);
  addHandlers(photos, 0);
};

async function renderPhotos(index) {
  let response = await fetch('/photos');
  let photos = await response.json();
  let slides = document.getElementById('slides');
  let header = document.querySelector('section header');
  
  let photosTemplate = document.getElementById('photos').innerHTML;
  let infoTemplate = document.getElementById('photo_information').innerHTML;

  let photosTemplateFunction = Handlebars.compile(photosTemplate);
  let infoTemplateFunction = Handlebars.compile(infoTemplate);
  slides.innerHTML = '';
  header.innerHTML = '';

  slides.insertAdjacentHTML('beforeend', photosTemplateFunction({ photos }));

  header.insertAdjacentHTML('beforeend', infoTemplateFunction(photos[index]));

  let figures = document.querySelectorAll('#slides figure');
  figures.forEach(figure => figure.classList.add('hide'));
  figures[index].classList.add('show');
  figures[index].classList.remove('hide');
}

function renderInfo(photos, index) {
  let header = document.querySelector('section header');
  let infoTemplate = document.getElementById('photo_information').innerHTML;
  let infoTemplateFunction = Handlebars.compile(infoTemplate);
  header.insertAdjacentHTML('beforeend', infoTemplateFunction(photos[index]));
}

function renderComments(comments) {
  let list = document.querySelector('#comments ul');

  let commentsTemplate = document.getElementById('photo_comments').innerHTML;
  let commentPartial = document.getElementById('photo_comment').innerHTML;

  let commentsTemplateFunction = Handlebars.compile(commentsTemplate);
  Handlebars.registerPartial('comment', commentPartial);

  list.insertAdjacentHTML('beforeend', commentsTemplateFunction({ comments }));
}

function addHandlers(photos, index) {
  let arrows = document.querySelector('#slideshow ul');
  let header = document.querySelector('section header');
  let next = document.getElementsByClassName('next')[0];
  let prev = document.getElementsByClassName('prev')[0];

  arrows.addEventListener('click', e => {
    e.preventDefault();
    if (e.target === next) {
      photos[index + 1] ? index += 1 : index = 0;
    } else if (e.target === prev) {
      photos[index - 1] ? index -= 1 : index = photos.length - 1;
    }
      
    clear();
    renderPhotos(index);

    let id = photos[index].id;
    (async function() {
      let commentResponse = await fetch(`/comments?photo_id=${id}`);
      let comments = await commentResponse.json();
      renderComments(comments)
    })();
  });

  header.removeEventListener('click', handleActions);
  header.addEventListener('click', handleActions);

  async function handleActions(e) {
    e.preventDefault();

    let button = e.target;
    let href = button.getAttribute('href');
    let id = button.getAttribute('data-id');
    let data = JSON.stringify({ 'photo_id': id });
    let text = button.textContent;

    fetch(href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
    })
    .then(response => response.json() )
    .then(value => {
      button.textContent = text.replace(/\d+/, value.total);
    });
  };
}

function clear() {
  let header = document.querySelector('section header');
  let list = document.querySelector('#comments ul');

  header.innerHTML = '';
  list.innerHTML = '';
}

renderPage();