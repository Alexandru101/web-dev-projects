# Stopwatch Documentation
<img width="743" height="438" alt="image" src="https://github.com/user-attachments/assets/1a6cbe6b-c1d1-4e5a-9f8c-e19a2a12009f" /><br>
[Website](https://Alexandru101.github.io/web-dev-projects/Stopwatch)

### This project was inspired by 'bro code - javascript tutorial playlist' on youtube

## Step 1: Refrencing DOM Elements
The first step is selecting the required HTML elements from the page.
These elements allow the script to display the time and control the stopwatch through buttons.

display shows the current stopwatch time.

startBtn starts the timer.

stopBtn pauses the timer.

resetBtn resets the timer back to zero.
```
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
```

## Step 2: Loading Saved Data
The application retrieves previously saved stopwatch data from localStorage.
If no saved data exists, an empty object is used as the default.

This allows the stopwatch state to persist even after refreshing the page.
```
const savedData = JSON.parse(localStorage.getItem("Data")) || {};
```

## Step 3: Declaring Stopwatch State Variables
Several variables are used to track the stopwatch state.

timer stores the interval responsible for updating the timer.

startTime records the timestamp when the stopwatch starts.

elapsedTime tracks the total time passed.

isRunning indicates whether the stopwatch is currently active.

If saved data exists, these values are restored so the timer continues from its previous state.
```
let timer = null;
let startTime = savedData.startTime || 0;
let elapsedTime = savedData.elapsedTime || 0;
let isRunning = savedData.isRunning || false;
```

## Step 4: Restarting the Timer if it Was Previously Running
If the stopwatch was active before the page refreshed, the interval is restarted automatically so the timer continues updating.
```
if (isRunning) {
    timer = setInterval(updateTimer, 10);
}
```

## Step 5: Saving Data
The saveData() function stores the current stopwatch state in localStorage.

This ensures the following values persist:

Start time

Elapsed time

Running status
```
function saveData() {
    const Data = {
        startTime: startTime,
        elapsedTime: elapsedTime,
        isRunning: isRunning
    }

    localStorage.setItem("Data", JSON.stringify(Data));
}
```

## Step 6: Updating Timer Display
The updateTimer() function calculates how much time has passed since the stopwatch started.

It converts the elapsed milliseconds into:

Hours

Minutes

Seconds

Milliseconds

Each value is formatted using padStart() so the display always shows two digits.

The formatted time string is then displayed in the display element.
```
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
```

## Step 7: Starting Stopwatch Click Event
When the Start button is clicked, the stopwatch begins running.

If the timer is not already active:

The start time is calculated so the stopwatch resumes correctly.

A timer interval is created that updates the display every 10 milliseconds.

The running state is updated.

The current stopwatch state is then saved.
```
startBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10);
        isRunning = true
    }

    saveData();
});
```

## Step 8: Stoping Stopwatch Click Event
When the Stop button is clicked, the timer interval is cleared so the stopwatch pauses.

The elapsed time is updated to preserve the correct time when the stopwatch resumes.

The running state is updated and the current data is saved.
```
stopBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }

    saveData();
})
```

## Step 9: Reseting Stopwatch Click Event
When the Reset button is clicked, the stopwatch returns to its default state.

The timer interval is cleared, all time values are reset, and the running state is set to false.
The reset values are saved to localStorage, and the display is updated to show 00:00:00:00.
```
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
```

## Setup Instructions

- Download [Visual Studio Code](https://code.visualstudio.com/) and make sure to have "Live Server" extension installed
- Create a folder for the project and make sure to change the html '<head>' stylesheet "href" suitable for your projects file names (eg what you have named instead of style.css and index.js)
- Create three files within that folder for index.html, index.js and style.css.
- Copy and paste all the code for each of these files that can be found within this project
- Press "Go Live" at the bottom of your visual studio code (IDE)
