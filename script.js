let moles = document.querySelectorAll(".mole");
let startBtn = document.getElementById("start");
let scoreText = document.querySelector("#score");
let highScoreText = document.querySelector("#highScore"); //!!
let timeText = document.querySelector("#süre");
let audio = document.getElementById("myAudio");

let formerMole;
let timeOver = false;
let score = 0;
let süre = 15;

// events

startBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", playAudio);
startBtn.addEventListener("click", saveHighScore);
moles.forEach((mole) => mole.addEventListener("click", hit));

// functions

// random mole

function randomMole() {
    let order = Math.floor(Math.random() * moles.length);
    let chosen = moles[order];
    if (formerMole === chosen) {
        return randomMole();
    } else {
        formerMole = chosen;
    }
    return chosen;
}

// random time

function randomTime(min, max) {
    let time = Math.round(Math.random() * (max - min)) + min;
    return time;
}

// moles up

function up() {
    let mole = randomMole();
    let moleTime = randomTime(750, 1250);
    mole.classList.add("chosen");
    setTimeout(() => {
        mole.classList.remove("chosen");
        if (!timeOver) up();
    }, moleTime)
}

// time action

function startTime() {
    if (!timeOver) {
        süre--;
        timeText.textContent = süre;
    } else {
        timeText.textContent = "time over"
    }
}

// start btn

function startGame() {
    süre = 15;
    score = 0;
    timeOver = false;
    let interval = setInterval(() => {
        startTime();
        if (timeOver) clearInterval(interval);
    }, 1000);
    up();
    setTimeout(() => {
        timeOver = true;
    }, süre * 1000);   // müziği ekle
}

// hit and score

function hit(e) {
    if (e.target.classList.contains("chosen")) {
        score++;
        e.target.classList.remove("chosen");
    }
    scoreText.textContent = score;
}

// high score

// En yüksek skoru saklamak için LocalStorage kullanımı
function saveHighScore(score) {
    var x = score;
    var y = x.toString();
    localStorage.setItem('score', y); //x'i değiştir
}

// Yüksek skoru LocalStorage'dan almak
function getHighScore() {
    var highScore = localStorage.getItem('x');

    if (highScore) {
        return parseInt(highScore);
    } else {
        return 0;
    }
}

// Yüksek skoru güncelleyen fonksiyon
function uptadeHighScore(score) {
    var highScore = getHighScore();

    if (score > highScore) {
        saveHighScore(score);
        highScoreText.textContent = score;
    } else {
        highScoreText.textContent = highScore;
    }
}

// yüksek skoru yazdırma

// function writeHighScore() {
//     highScoreText.textContent = newScore;
// }












// song play & stop song

function playAudio() {
    audio.play();

    setTimeout(function () {
        audio.pause();
    }, 15000);
}

// aim imleci

document.addEventListener('DOMContentLoaded', function () {
    var cursorImg = document.createElement('img');
    cursorImg.src = 'aim.png';
    cursorImg.id = 'custom-cursor';
    document.body.appendChild(cursorImg);

    document.addEventListener('mousemove', function (e) {
        var cursor = document.getElementById('custom-cursor');
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
});