// Letters
const letters = Array.from('abcdefghijklmnopqrstuvwxyz')
let letterContainer = document.querySelector('.letters');
letters.forEach(letter => {
    let span = document.createElement('span');
    let node = document.createTextNode(letter);
    span.appendChild(node);
    span.className = 'letter-box';
    letterContainer.appendChild(span)
});

// words & categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
  }
let kx = Object.keys(words);
var randWordIn = Math.floor(Math.random() * kx.length);
var randWord = kx[randWordIn];
let cate = document.querySelector('.category span');
cate.innerHTML = randWord;
let randValueIn = Math.floor(Math.random() * words[randWord].length);
let randValue = words[randWord][randValueIn]

// letter guess fields
let wrongAttemps = 0;
let correctAttemps = 0;
let guess = document.querySelector('.letter-guess');
let wordArray = Array.from(randValue.toLowerCase());
wordArray.forEach(l => {
    let span = document.createElement('span')
    if (l === ' ') {
        span.className = 'space';
        correctAttemps += 1;
    }
    guess.appendChild(span)
});
let guessSpan = document.querySelectorAll('.letter-guess span');
let hangman = document.querySelector('.hangman');

// click on keybard
document.addEventListener('click', (e) => {
    let status = false;
    if (e.target.className == 'letter-box') {
        e.target.classList.add('clicked');
        wordArray.forEach((l, il) => {
            if (l == e.target.innerHTML) {
                status = true;
                correctAttemps += 1;
                guessSpan[il].innerHTML = e.target.innerHTML;
            }

        })

        if (status !== true) {
            wrongAttemps += 1;
            hangman.classList.add(`wrong-${wrongAttemps}`);
            document.getElementById('fail').play()
            if (wrongAttemps === 8) {
                letterContainer.classList.add('finished');
                let div = document.createElement('div');
                div.classList.add('popup');
                let divText = document.createTextNode(`Game Over , The Word Is ${randValue}`)
                div.appendChild(divText);
                document.body.appendChild(div)
            }
        }
        else {
            document.getElementById('correct').play()

            if (correctAttemps === randValue.length) {
                letterContainer.classList.add('finished');
                let div = document.createElement('div');
                div.classList.add('popup');
                let level = ''

                switch (wrongAttemps) {
                    case 7:
                    case 6:
                        level = 'Piegon'

                        break;
                    case 5:
                    case 4:
                    case 3:
                        level = 'Eagon'
                        break;
                    default:
                        level = 'Dragon'

                        break;
                }
                let divText = document.createTextNode(`You Win ,  Your Level  Is ${level}`)
                div.appendChild(divText);
                document.body.appendChild(div)
            }
        }
    };
})










