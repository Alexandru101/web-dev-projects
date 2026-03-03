const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const savedData = JSON.parse(localStorage.getItem("Data")) || {};
let timer = null;
let startTime = savedData.startTime || 0;
let elapsedTime = savedData.elapsedTime || 0;
let isRunning = savedData.isRunning || false;

if (isRunning) {
    timer = setInterval(updateTimer, 10);
}

function saveData() {
    const Data = {
        startTime: startTime,
        elapsedTime: elapsedTime,
        isRunning: isRunning
    }

    localStorage.setItem("Data", JSON.stringify(Data));
}

function updateTimer() {
    const CT = Date.now();
    elapsedTime = CT - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, "0");
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60).toString().padStart(2, "0");
    let seconds = Math.floor(elapsedTime / 1000 % 60).toString().padStart(2, "0");
    let milliseconds = Math.floor(elapsedTime % 1000 / 10).toString().padStart(2, "0");

    const fullTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    display.textContent = fullTime;
}

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10);
        isRunning = true
    }

    saveData();
});

stopBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }

    saveData();
})

resetBtn.addEventListener("click", () => {
    if (timer != null) {
        clearInterval(timer);
    }

    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    saveData();
    display.textContent = "00:00:00:00";
})
