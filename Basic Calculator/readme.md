# Basic-Calculator Documentation
[License](https://github.com/Alexandru101/web-dev-projects/blob/main/LICENSE)

### Project Overview
As my first JavaScript project, the main goal was to build a functional calculator that handles basic operations (addition, subtraction, multiplication, and division) while supporting result-chaining, allowing users to continue calculations immediately after a result is generated.

Scope & Limitations, This project focuses on linear, left-to-right logic rather than BIDMAS/PEMDAS order of operations. It is designed as a standard pocket calculator and does not include scientific functions like trigonometry (sin, cos, tan) or logarithms.

## Step 1: Referencing Elements & Global Variables
Nice little optimization trick I found was to store all the buttons within one refrence and then using a 'forEach' loop to assign a click event therefore saving multiple lines of code and making the code more readible
```
const display = document.getElementById("display");
const number_buttons = document.querySelectorAll('.number');
const operation_buttons = document.querySelectorAll('.button_operation');
const reset_button = document.getElementById("button_reset");

const symbols = ["+", "-", "*", "/"]; 
let characters = [];
let operators = [];
let expression = "";
```

## Step 2: Attaching Click Events (number buttons)
Looping through each number button (0-9) to assign a click event. When clicked, it checks if the display limit is reached, then appends the digit to the current 'expression' string for display and future calculation.
```
number_buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (expression.length > 13) { return; }

        const num = button.innerText;
        if (operators.length === 0 && characters.length === 0 && expression !== "") {
            expression = num;
        } else if (expression === "0" || expression === "") {
            expression = num;
        } else {
            expression += num;
        }

        display.textContent = expression;

        if (expression.length > 10){
            display.style.fontSize = "50px"
        } else if (expression.length > 5){
            display.style.fontSize = "65px";
        } else {
            display.style.fontSize = "100px";
        }
    })
})
```

## Step 3: Calculating Expression Function
The "brain" of the calculator. This function takes all the stored numbers and operators, runs through them from left to right, and updates the screen with the final answer. It also keeps things tidy by rounding long decimals and catching division-by-zero errors before they crash the site
```

```
