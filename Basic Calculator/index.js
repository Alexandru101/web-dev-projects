// Referencing Elements //
const display = document.getElementById("display");
const number_buttons = document.querySelectorAll('.number');
const operation_buttons = document.querySelectorAll('.button_operation');
const reset_button = document.getElementById("button_reset");

// Global Variables //
const symbols = ["+", "-", "*", "/"]; 
let characters = [];
let operators = [];
let expression = "";
let is_result = false;

/* Looping through each number button (0-9) to assign a click event. 
   When clicked, it checks if the display limit is reached, then appends 
   the digit to the current 'expression' string for display and future calculation. */
number_buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (expression.length > 13) { return; }

        const num = button.innerText;
        if (is_result || expression === "0" || expression === "") {
            expression = num;
            is_result = false;
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

/* Logic to process and display the final math result */
function calculate_expression(){
    // Making sure there are enough numbers and at least one operator to perform a calculation
    if (characters.length < 2 && operators.length === 0){
        if (characters.length === 1){
            display.textContent = characters[0];
        } 

        return; // Exiting function if requirements not met
    }

    let result = characters[0]; // Initializing the result with the first number of the array

    /* Iterate through the operators array, applying each operation to 
       the next number in the sequence (left-to-right calculation) */
    for (let i = 0; i < operators.length; i++){
        const currentOperator = operators[i];
        const nextNum = characters[i + 1];

        if (nextNum === undefined) { break; }
        if (currentOperator === "+") { result += nextNum; }
        if (currentOperator === "-") { result -= nextNum; }
        if (currentOperator === "*") { result *= nextNum; }

        if (currentOperator === "/") {
            if (nextNum === 0) {
                display.textContent = "Error";

                // Resetting state to prevent further errors //
                characters = [];
                operators = [];
                expression = "";

                return;
            }

            result /= nextNum;
        }
    }

    /* Displaying a format result to a maximum of three decimal places to keep the 
       display clean, while not having having too much numbers that may break the
       display. Finally we then update the UI with the result of the calculation */
    const finalResult = Number(result.toFixed(3));
    display.textContent = finalResult;

    // Cleanup //
    characters = [];
    operators = [];
    expression = result.toString();
    is_result = false;
}

/* Attaching click events to the operator buttons. When a math operator is clicked, 
   the current 'expression' is converted to a number and stored. 
   If '=' is clicked, it triggers the calculation. This also handles 
   operator swapping, allowing users to change their mind for example from + to * etc.*/
operation_buttons.forEach(button => {
    button.addEventListener('click', () =>{
        const operator = button.innerText;
        if (operator === "="){
            if (expression != ""){
                characters.push(Number(expression));
            }

            calculate_expression();
            return;
        }

        is_result = false;
        if (expression !== ""){
            characters.push(Number(expression));
            operators.push(operator);
            expression = "";

            display.textContent = operator;
            display.style.fontSize = "100px";
        } else if (operators.length > 0) {
            operators[operators.length - 1] = operator;
            display.textContent = operator;
        }
    })
})

/* Click event for the 'AC' button to clear characters and operators array, 
   We also reset the expression, and return the display to its default state. */
reset_button.onclick = function(){
    characters = [];
    operators = [];
    expression = "";
    is_result = false;
    display.textContent = "0";
    display.style.fontSize = "100px";
}
