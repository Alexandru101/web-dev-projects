# Digital-Clock-Application Documentation

[License](https://github.com/Alexandru101/web-dev-projects/blob/main/LICENSE)
[Website](https://Alexandru101.github.io/web-dev-projects/Digital%20Clock%20Application)<br>
<img width="655" height="421" alt="image" src="https://github.com/user-attachments/assets/45d740e5-9562-413d-b1e6-b205855c275d" />

## Project Overview
The Digital Clock Application displays the current time, weekday, month, and year. The project primarily demonstrates the use of JavaScript's Date() function to retrieve the current date and time, and then formating those values into readable strings for the user.

### Key Features
- Displays the current time (hours, minutes, seconds)
- Shows the current weekday (e.g., Monday, Tuesday)
- Presents the current month (e.g., January, February)
- Displays the current year

## Step 1: HTML Elements

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Digital Clock</title>
    <link rel="icon" href="data:image/png;base64,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">
    <link rel="stylesheet" href="style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="container">
        <label id="time"></label>
        <label id="date"></label>
    </div>

    <script src="index.js"></script>
</body>
</html>
```

## Step 2: CSS Stylying
```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    background-color: #0A84FF;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;

    gap: 20px;
    padding: 20px;
}

#container {
    height: 130px;
    width: 300px;

    background-color: #0F1A24;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border: 5px solid #0F1A24;
    border-radius: 30px;

    transform: translateY(-100px);
    gap: 5px;
}

#time {
    font-size: 50px;
    color: white;
    font-family: "Roboto Mono";
}

#date {
    font-size: 20px;
    color: white;
}
```

## Step 3: Javascript Functionality
This code is used to display a real-time digital clock with both the current time (in hours, minutes, and seconds) and the current date (including weekday, month, day, and year).

The updateTimer function utilizes the Date() object to fetch the current time and formats it to always show two digits for hours, minutes, and seconds (e.g., 00:00:00). The formatted time is then displayed in the #time DOM element.

The same Date() object is also used to extract the full weekday name, month name, numeric day, and the year. These values are formatted into a string (e.g., Monday, February 5 2026) and displayed in the #date DOM element.

The updateTimer function is called once when the page loads, ensuring that the time and date are displayed immediately. It is then executed every second (using setInterval) to keep the clock updated in real-time.

This provides a simple, live updating clock and date display using JavaScript and native Date object methods.
```
const time = document.getElementById("time");
const date = document.getElementById("date");

function updateTimer() {
    // Referencing Current Date Object //
    const CT = new Date();

    const hours = CT.getHours().toString().padStart(2, "0");
    const minutes = CT.getMinutes().toString().padStart(2, "0");
    const seconds = CT.getSeconds().toString().padStart(2, "0");

    time.textContent = `${hours}:${minutes}:${seconds}`; // Display the formatted time string to the user

    // Using date methods to retrieve specific date components //
    const WEEKDAY = CT.toLocaleString("en-us", { weekday: "long" });
    const MONTH = CT.toLocaleString("en-us", { month: "long" });
    const DAY = CT.toLocaleString("en-us", { day: "numeric" });
    const YEAR = CT.toLocaleString("en-us", { year: "numeric" });
    const FULL_DATE = `${WEEKDAY}, ${MONTH} ${DAY} ${YEAR}`;
    
    date.textContent = FULL_DATE;
}

updateTimer();

setInterval(updateTimer, 1000);
```
