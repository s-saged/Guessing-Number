// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');

const p = document.createElement('p');

let previousGuesses = [];
let numGuesses = 0;
let playGame = true;

const maxGuesses = 10;

// Event
submit.addEventListener("click", function (e) {
    e.preventDefault();
    if (!playGame) return;

    const guess = Number(userInput.value);
    validateGuess(guess);
});

// Validate input
function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("ادخل رقم صحيح");
        return;
    }
    if (guess < 1 || guess > 100) {
        alert("الرقم لازم يكون بين 1 و 100");
        return;
    }

    previousGuesses.push(guess);
    numGuesses++;

    displayGuesses(guess);
    checkGuess(guess);
    checkGameOver();
}

// Check guess
function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`فزت! الرقم الصحيح هو ${randomNumber}`);
        endGame();
    } else if (guess > randomNumber) {
        displayMessage("أعلى من الرقم المطلوب");
    } else {
        displayMessage("أقل من الرقم المطلوب");
    }
}

// Update UI guesses
function displayGuesses(guess) {
    userInput.value = "";
    guessSlot.innerHTML += `${guess} `;
    remaining.innerHTML = `${maxGuesses - numGuesses}`;
}

// Check game over
function checkGameOver() {
    if (numGuesses >= maxGuesses && previousGuesses[previousGuesses.length - 1] !== randomNumber) {
        displayMessage(`خسرت! الرقم كان ${randomNumber}`);
        endGame();
    }
}

// Show message
function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// End game
function endGame() {
    userInput.setAttribute("disabled", "");

    p.classList.add("button");
    p.innerHTML = `<h2 id="newgame">ابدأ لعبة جديدة</h2>`;
    startOver.appendChild(p);

    playGame = false;

    newGame();
}

// Restart game
function newGame() {
    const newGameButton = document.querySelector("#newgame");

    newGameButton.addEventListener("click", function () {
        randomNumber = Math.floor(Math.random() * 100) + 1;

        previousGuesses = [];
        numGuesses = 0;
        playGame = true;

        guessSlot.innerHTML = "";
        lowOrHi.innerHTML = "";
        remaining.innerHTML = maxGuesses;

        userInput.removeAttribute("disabled");
        userInput.value = "";

        startOver.removeChild(p);
    });
}