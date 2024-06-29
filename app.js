let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score");

document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        levelUp();
    }
});

document.addEventListener("touchstart", function(event) {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * btns.length);
    let randcolor = btns[randIdx];
    let randBtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    gameflash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level;
            highScoreDisplay.innerText = `Highest Score: ${highScore}`;
        }
        h2.innerHTML = `Game Over!! Your Score was <b>${level}</b><br> Press any Key to Start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "#222";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkAns(userSeq.length - 1);
}


let lastTap = 0;
function handleDoubleTap(event) {
    let currentTime = new Date().getTime();
    let tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
        btnPress.call(this, event);
    }
    lastTap = currentTime;
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
    btn.addEventListener("touchend", handleDoubleTap); 
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
