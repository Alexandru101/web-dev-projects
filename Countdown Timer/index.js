const arrows = document.querySelectorAll(".arrow");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

let lastSave = JSON.parse(localStorage.getItem("timer")) || {};
let running = false;

function loadSave() {
    let totalSeconds = lastSave.totalSeconds || 0;

    if (lastSave.running) {
        const elapsed = Math.floor((Date.now() - lastSave.lastUpdated) / 1000);
        totalSeconds = Math.max(0, totalSeconds - elapsed);
        running = totalSeconds > 0;
    }

    hours.value = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    minutes.value = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    seconds.value = String(totalSeconds % 60).padStart(2, "0");

    if (running) { countdown(); };
}

loadSave();

arrows.forEach((arrow) => {
    arrow.addEventListener("click", function(){
        const part = arrow.dataset.part;
        const element = document.getElementById(part);
        
        let val = parseInt(element.value) || 0;
        val += arrow.textContent === "▲" ? 1 : -1;
        if (val < 0) {
            element.value = "00";
            return;
        }

        const maxVal = part === "hours" ? 99 : 59;
        val = Math.min(val, maxVal);

        element.value = val.toString().padStart(2, "0");
    })
})

function saveTimer(){
    let totalSeconds = parseInt(hours.value) * 3600;
    totalSeconds += parseInt(minutes.value) * 60;
    totalSeconds += parseInt(seconds.value);

    localStorage.setItem("timer", JSON.stringify({
        totalSeconds: totalSeconds,
        running: running,
        lastUpdated: Date.now()
    }))
}

async function countdown(){
    while (running) {
        let h = parseInt(hours.value) || 0;
        let m = parseInt(minutes.value) || 0;
        let s = parseInt(seconds.value) || 0;

        s--;
        if (s < 0 ){
            s = 59;
            m--;
            if (m < 0) {
                m = 59;
                h--;
                if (h < 0){
                    h = m = s = 0;
                    running = false;
                }
            }
        }
        
        hours.value = h.toString().padStart(2, "0");
        minutes.value = m.toString().padStart(2, "0");
        seconds.value = s.toString().padStart(2, "0");
        saveTimer();

        await new Promise(resolve => setTimeout(resolve, 1000)); // 1000 milliseconds -> 1 second
    }
}

startBtn.addEventListener("click", () => {
    if (!running) {
        running = true;
        countdown();
    }
})

pauseBtn.addEventListener("click", () => {
   running = false;
   saveTimer(); 
});

stopBtn.addEventListener("click", () => {
    running = false;
    
    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";
    saveTimer()
})
