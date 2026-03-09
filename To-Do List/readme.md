# To-Do-List Documentation
<img width="1277" height="839" alt="image" src="https://github.com/user-attachments/assets/db6831d0-9b68-47a4-be36-cbb10863d097" />
[License](https://github.com/Alexandru101/web-dev-projects/blob/main/LICENSE)
[Website](https://alexandru101.github.io/web-dev-projects/To-Do%20List/)

## Step 1: Declaring Variables
Note we attempt to grab the data stored from the localstorage if the user has existing data, if not we simply asign a empty array to the 'storredtasks' variable essentially creating a blank data array that we can save the data to for when the users decides to join back.
```
const textboxBtn = document.getElementById("todo_input");
const createBtn = document.getElementById("todo_btn");
const liveTimer = document.getElementById("time");
const todoList = document.getElementById("todo_list");
let storredTasks = JSON.parse(localStorage.getItem("todoList")) || [];
```

## Step 2: Live Timer
First we get the current date and store it in the variable CT, which stands for Current Time. Using the toLocaleString() method, the date object is converted into a human-readable string based on the user’s system locale, combining both the current date and time.

This formatted value is then displayed in the liveTimer element by updating its innerText. The updateTime() function is first executed once so the time appears immediately when the page loads. After that, setInterval() calls the same function every 1000 milliseconds (1 second) to continuously refresh the displayed time, creating a live updating clock on the page.
```
function updateTime(){
    const CT = new Date();
    const dateTimeString = CT.toLocaleString();
    liveTimer.innerText = dateTimeString;
}

updateTime();
setInterval(updateTime, 1000);
```

## Step 3: Rendering Tasks to the Page
The renderTasks() function is responsible for displaying all tasks stored in the storredTasks array. It first clears the existing task list in the DOM to avoid duplicates.

The function then loops through each task using forEach(). For every task, a new <li> element is created and assigned the todo_item class. If the task’s completed property is true, the completed class is added to visually mark the task as finished.

Inside each list item, the task text is displayed along with two buttons:

A check button that toggles the task’s completion state.

A delete button that removes the task.

Each task element is appended to the todoList container so it appears on the page.

At the end of the function, the current task array is saved to localStorage so the tasks persist after the page reloads.

Essentially this function gets called anytime a task is deleted or added to the page aswell as when the page first loads, effectivly deleting the current tasks and adding them back with the new data (eg updating / rendering the tasks to the page)
```
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
```

## Step 4: Toggling Task Completion State Handler
The toggleTask() function is used to mark tasks as completed or not completed. It receives the index of the selected task and flips the completed boolean value using the ! operator.

After updating the task state, renderTasks() is called again so the UI refreshes and reflects the updated status. Essentially we change the property of the task elements data inside our 'storredTasks' array and then call the 'renderTask()' to update the element so the user can visually see the current completion state of the task element.
```
function toggleTask(index){
    storredTasks[index].completed = !storredTasks[index].completed;
    renderTasks();
}
```

## Step 5: Task Deletion Handler
The deleteTask() function removes a task from the list. First, it retrieves all elements with the class todo_item and selects the one corresponding to the provided index.

A fall class is added to trigger a CSS animation before the task is removed. Once the animation or transition finishes, the finishDelete() function runs.

finishDelete() removes the task from the storredTasks array using splice() and then calls renderTasks() to update the displayed list.
```
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
```

## Step 6: Adding Tasks Functionality
An event listener is attached to the Create button. When clicked, it reads the value from the textbox and removes any leading or trailing spaces using trim().

If the input is empty, an alert is displayed and the function stops executing.

Otherwise, a new task object containing the task text and a completed value of false is added to the storredTasks array. The textbox is then cleared and renderTasks() is called to update the task list.
```
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
```

## Step 7: Binding Create Task Functionality To 'Enter' Key
An additional event listener is attached to the textbox to detect keyboard input. When the Enter key is pressed, the click() method is triggered on the Create button.

This allows users to add tasks using the keyboard instead of manually clicking the button.
```
textboxBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        createBtn.click();
    }
})
```

## Step 8: Loading Saved Data
Finally, renderTasks() is called when the script loads so any tasks stored in localStorage are immediately displayed on the page when the user first loads.
```
renderTasks();
```
