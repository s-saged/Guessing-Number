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

if (playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();

        const guess = Number(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number.");
    }
    else if (guess < 1) {
        alert("Please enter a number greater than 0.");
    }
    else if (guess > 100) {
        alert("Please enter a number less than or equal to 100.");
    }
    else {
        previousGuesses.push(guess);

        displayGuesses(guess);
        checkGuesses(guess);
    }
}

function checkGuesses(guess) {
    if (guess === randomNumber) {
        displayMessage(
            `Congratulations! You guessed the number in ${numGuesses} guesses!`
        );
        endgame();
    }
    else if (numGuesses >= maxGuesses) {
        displayMessage(`Game Over! Number was ${randomNumber}`);
        endgame();
    }
    else if (guess > randomNumber) {
        displayMessage("Too high! Try again.");
    }
    else {
        displayMessage("Too low! Try again.");
    }
}

function displayGuesses(guess) {
    userInput.value = "";

    guessSlot.innerHTML += `${guess} `;

    numGuesses++;

    remaining.innerHTML = `${maxGuesses - numGuesses}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h1>${message}</h1>`;
}

function endgame() {
    userInput.value = "";
    userInput.setAttribute("disabled", "");

    p.classList.add("button");
    p.innerHTML = `<h1 id="newgame">Start New Game</h1>`;

    startOver.appendChild(p);

    playGame = false;

    newgame();
}

function newgame() {
    const newGameButton = document.querySelector("#newgame");

    newGameButton.addEventListener("click", function () {

        randomNumber = Math.floor(Math.random() * 100) + 1;

        previousGuesses = [];
        numGuesses = 0;

        guessSlot.innerHTML = "";
        lowOrHi.innerHTML = "";

        remaining.innerHTML = maxGuesses;

        userInput.removeAttribute("disabled");
        userInput.value = "";

        startOver.removeChild(p);

        playGame = true;
    });
}