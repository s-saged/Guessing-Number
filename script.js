let secret;
let attempts = 10;
let score = 0;
let xp = 0;
let level = 1;
let max = 50;
let history = [];

let high = Number(localStorage.getItem("high")) || 0;
document.getElementById("high").textContent = high;

let overlay = document.getElementById("overlay");

let today = new Date().toDateString();
if (localStorage.getItem("daily") !== today) {
    localStorage.setItem("daily", today);
    xp += 30;
    score += 50;
}

function setLevel() {
    let l = document.getElementById("level").value;

    if (l === "easy") max = 50;
    else if (l === "medium") max = 100;
    else max = 200;

    secret = Math.floor(Math.random() * max) + 1;
    attempts = 10;
    history = [];

    document.getElementById("left").textContent = attempts;
    document.getElementById("history").innerHTML = "";
    document.getElementById("guess").value = "";
}

function updateUI() {
    document.getElementById("score").textContent = score;
    document.getElementById("xp").textContent = xp;
    document.getElementById("lvl").textContent = level;

    document.getElementById("xpFill").style.width = (xp / 100) * 100 + "%";
}

function show(t) {
    overlay.style.display = "flex";
    overlay.textContent = t;
}

function hide() {
    overlay.style.display = "none";
}

function checkGuess() {

    let v = Number(document.getElementById("guess").value);
    let box = document.getElementById("box");

    if (isNaN(v) || v < 1 || v > max) {
        box.classList.add("shake");
        setTimeout(() => box.classList.remove("shake"), 300);
        alert("ادخل رقم بين 1 و " + max);
        return;
    }

    attempts--;
    document.getElementById("left").textContent = attempts;

    let msg = "";

    if (v < secret) msg = "↑ أعلى من " + v;
    else if (v > secret) msg = "↓ أقل من " + v;
    else msg = "✔ صح";

    history.push(v + " → " + msg);

    document.getElementById("history").innerHTML =
        history.map(h => `<div>${h}</div>`).join("");

    if (v === secret) {

        score += attempts * 10;
        xp += 20;

        if (xp >= 100) {
            xp = 0;
            level++;
        }

        if (score > high) {
            high = score;
            localStorage.setItem("high", high);
        }

        document.getElementById("high").textContent = high;
        updateUI();

        show("WIN 🎉");

        setTimeout(() => {
            hide();
            setLevel();
        }, 2000);

        return;
    }

    if (attempts === 0) {
        show("LOSE 💀");

        setTimeout(() => {
            hide();
            setLevel();
        }, 2000);
    }

    document.getElementById("guess").value = "";
    document.getElementById("guess").focus();

    updateUI();
}

document.getElementById("level").addEventListener("change", setLevel);

document.getElementById("guess").addEventListener("keydown", e => {
    if (e.key === "Enter") checkGuess();
});

setLevel();
updateUI();