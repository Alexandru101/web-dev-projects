// Declaring Variables //
const textboxBtn = document.getElementById("todo_input");
const createBtn = document.getElementById("todo_btn");
const liveTimer = document.getElementById("time");
const todoList = document.getElementById("todo_list");
let storredTasks = JSON.parse(localStorage.getItem("todoList")) || [];

// Setting Live Timer //
function updateTime(){
    const CT = new Date();
    const dateTimeString = CT.toLocaleString();
    liveTimer.innerText = dateTimeString;
}

updateTime();
setInterval(updateTime, 1000);

// Check + Delete Task Functions //
function toggleTask(index){
    storredTasks[index].completed = !storredTasks[index].completed;
    renderTasks();
}

function deleteTask(index){
    const elements = document.querySelectorAll(".todo_item");
    const elementsToDelete = elements[index];

    elementsToDelete.classList.add("fall");

    function finishDelete() {
        storredTasks.splice(index, 1);
        renderTasks();
    }

    elementsToDelete.addEventListener("transitionend", finishDelete);
    elementsToDelete.addEventListener("animationend", finishDelete);
}

// Creating HTML Elements //
function renderTasks(){
    todoList.innerHTML = "";

    storredTasks.forEach((task, index) => {
        const LI = document.createElement("li");
        LI.classList.add("todo_item");
        
        if (task.completed){
            LI.classList.add("completed");
        }

        LI.innerHTML = `
            <label class="taskDescription">${task.text}</label>
            <div class="todo_button_container">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;

        todoList.appendChild(LI);
    });

    localStorage.removeItem("todoList");
    localStorage.setItem("todoList", JSON.stringify(storredTasks));
}

// Adding functionality to the 'Create' button //
createBtn.addEventListener("click", () => {
    const currentTask = textboxBtn.value.trim();
    if (!currentTask){
        window.alert("Text Not Found");
        return;
    }

    storredTasks.push({ text: currentTask, completed: false })
    textboxBtn.value = "";
    renderTasks();
})

// Adding functionality to the textbox // 
textboxBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        createBtn.click();
    }
})

// Loading Saved Tasks //
renderTasks();
