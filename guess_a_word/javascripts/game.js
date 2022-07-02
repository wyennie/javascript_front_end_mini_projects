const chosenWordTemplate = Handlebars.compile($('#chosenWord').html());
const guessedLettersTemplate = Handlebars.compile($('#guessedLetters').html());
let $message = $('#message');
let $replay = $('#replay');
let apples = document.getElementById('apples');


let randomWord = (function() {
  const WORDS = ['apple', 'banana', 'orange', 'pear'];

  return function () {
    if (WORDS.length === 0) {
      return undefined;
    }

    let index = Math.floor(Math.random() * WORDS.length);
    let word = WORDS[index];
    WORDS.splice(index, 1);
    return word;
  }
})();

class Game {
  constructor() {
    this.word = randomWord();
    this.lettersGuessed = [];
    this.wrongGuesses = 0;
    this.maxWrongGuesses = 6;
    this.state = 'pending';
    this.displayBoard();
    this.setAnchorHandler();
    this.setHandler(true);
  }

  resetGame() {
    this.word = randomWord();
    this.lettersGuessed = [];
    this.wrongGuesses = 0;
    apples.classList.remove(...apples.classList);
    this.state = 'pending';
    this.setState(this.state);
    this.displayBoard();
    this.setHandler(true);
    document.body.className = '';
  }

  displayBoard() {
    if (this.state === 'pending') {
      this.displaySpaces();
    }
  }

  displaySpaces() {
    let spaces = $('#spaces');
    let guesses = $('#guesses');
    spaces.html(chosenWordTemplate(this.buildData()));
    guesses.html(guessedLettersTemplate(this.buildData()));
  }

  setAnchorHandler() {
    $replay.on('click', e => {
      e.preventDefault();

      this.resetGame();
      $replay.css('display', 'none');
    });
  }

  setHandler(lever) {
    function letterKeys(event) {
      event.preventDefault();
      let letter = event.key;
      
      if (!/[a-z]/i.test(letter) ||
      this.lettersGuessed.includes(letter) ||
      this.state !== 'pending') { 
        return; 
      } 
    
      this.lettersGuessed.push(letter);

      if (!this.word.split('').includes(letter)) { 
        this.wrongGuesses += 1;
        let appleClass = 'guess_' + String(this.wrongGuesses);
        apples.classList.remove(...apples.classList);
        apples.classList.add(appleClass);
      }

      this.displayBoard();
    };

    if (lever) {
      document.addEventListener('keypress', letterKeys.bind(this));
    } else {
      document.removeEventListener('keypress', letterKeys.bind(this));
    }
  }

  setState(state) {
    if (state === 'win') {
      this.state = state;
    } else if (this.word === undefined) {
      this.state = 'no words';
    } else if (state === 'lose') {
      this.state = 'lose';
    } else if (state === 'pending') {
      this.state = 'pending';
    }

    this.message();
    this.handleState();
  }

  handleState() {
    let state = this.state;

    if (state === 'win') {
      this.setHandler(false);
      document.body.classList.add('win')
      $replay.css('display', 'inline');
    } else if (state === 'lose') {
      this.setHandler(false);
      document.body.classList.add('lose')
      $replay.css('display', 'inline');
    }
  }

  message() {
    let message = '';

    if (this.state === 'win') {
      message = "You win!";
    } else if (this.state === 'no words') {
      message = "Sorry, I've run out of words!";
    } else if (this.state === 'lose') {
      message = 'You ran out of Guesses!';
    }

    $message.html(message);
  }

  buildData() {
    let data = { letters: [], guessed: [], };

    this.lettersGuessed.forEach(letter => {
      data.guessed.push({ letter: letter, });
    });
  
    let win = true;

    this.word.split('').forEach(letter => {  
      if (this.lettersGuessed.includes(letter)) {
        data.letters.push({ letter: letter, });
      } else {
        data.letters.push({ letter: '' });
        win = false;
      }
    });
    if (this.wrongGuesses >= this.maxWrongGuesses) { this.setState('lose'); }
    if (win) { this.setState('win'); }
    return data
  }
}

let game = new Game();
