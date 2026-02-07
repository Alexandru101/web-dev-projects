# Simple Counter
[License](https://github.com/Alexandru101/web-dev-projects/blob/main/LICENSE)
[Website](https://alexandru101.github.io/web-dev-projects/Counter%20Program)

## Step 1: Structuring the UI with HTML
We first start by creating a parent div to manage the overall layout. This contains a counter label and a nested div element for the buttons. By wrapping the buttons in their own container, we can easily switch their layout from a vertical column to a horizontal row using Flexbox.

- index.html file below
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter</title>

    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="button__placement">
        <label class="counter__design" id="counter_label">0</label>

        <div class="button__container">
            <button class="button__design" id="decrease_button">Decrease</button>
            <button class="button__design" id="reset_button">Reset</button>
            <button class="button__design" id="increase_button">Increase</button>
        </div>
    </div>

    <script src="index.js"></script>
</body>
</html>
```

## Step 2: Styling UI
- style.css below
```
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: #ebe0e0;
}

.counter__design {
    color: lightgreen;
    font-size: 150px;
}

.button__placement {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: #312e2e;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
}

.button__container {
    display: flex;
    gap: 15px;
}

.button__design {
    font-size: 2em;
    cursor: pointer;

    background-color: #192d9b;
    transition: background-color 0.25s;
}

.button__design:hover{
    background-color: #2341e9;
}
```

## Step 3: Handling Logic With Javascript
First, we reference all the elements (counter_label and buttons) and create a variable named counter with the value 0 assigned as the starting point.

Finally, we add an onclick event to all the buttons to increment, decrease, or reset the counter, then update the label_counter text to the counter's current value.
```
const label_counter = document.getElementById("counter_label");
const decreaseBtn = document.getElementById("decrease_button");
const resetBtn = document.getElementById("reset_button");
const increaseBtn = document.getElementById("increase_button");

let counter = 0;

decreaseBtn.onclick = function(){
    counter--;
    label_counter.textContent = counter;
}

resetBtn.onclick = function(){
    counter = 0;
    label_counter.textContent = counter;
}

increaseBtn.onclick = function(){
    counter++;
    label_counter.textContent = counter;
}
```

## Setup Instructions

- Download [Visual Studio Code](https://code.visualstudio.com/) and make sure to have "Live Server" extension installed
- Create a folder for the project and make sure to change the html stylesheet "href" to look for your projects file name
- Create three files within that folder for index.html, index.js and style.css.
- Press "Go Live" at the bottom of your visual studio code (IDE)
