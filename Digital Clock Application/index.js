// Referencing Time + Date Elements //
const time = document.getElementById("time");
const date = document.getElementById("date");

// Creating 'updateTimer' Function //
function updateTimer() {
    // Referencing Current Date Object //
    const CT = new Date();

    const hours = CT.getHours().toString().padStart(2, "0"); // Format hours to two digits (e.g., '08')
    const minutes = CT.getMinutes().toString().padStart(2, "0"); // Format minutes to two digits (e.g., '05')
    const seconds = CT.getSeconds().toString().padStart(2, "0"); // Format seconds to two digits (e.g., '09')

    time.textContent = `${hours}:${minutes}:${seconds}`; // Display the formatted time string to the user

    // Using date methods to retrieve specific date components //
    const WEEKDAY = CT.toLocaleString("en-us", { weekday: "long" }) // Full name of the weekday (e.g., "Monday")
    const MONTH = CT.toLocaleString("en-us", { month: "long" }) // Full name of the month (e.g., "February")
    const DAY = CT.toLocaleString("en-us", { day: "numeric" }) // Numeric day of the month
    const YEAR = CT.toLocaleString("en-us", { year: "numeric" }) // Full numeric year (e.g., 2026)
    const FULL_DATE = `${WEEKDAY}, ${MONTH} ${DAY} ${YEAR}`; // Formatting string into a full date display
    
    date.textContent = FULL_DATE; // Display the formatted date string to the user
}

updateTimer(); // Initial call to display time immediately on page load

// Set the function to execute every 1000 milliseconds (1 second) //
setInterval(updateTimer, 1000);
