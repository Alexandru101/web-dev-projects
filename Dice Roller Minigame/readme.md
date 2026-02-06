# Dice-Roller-Minigame Documentation

## Step 1: Declaring Dice Min & Max Roll
```
const MIN = 1;
const MAX = 6;
```

## Step 2: Main Dice Roll Function
First we get the number specified from the user, if the number is not within the range (1 - 6) we early exit the function using 'return'.

Secondly we refrence both the results (label) and diceImages (div container), then we create two arrays one for all the values from the dice roll and next for all the dice images that will represent the values.

Lastly we 

First, we retrieve the value specified by the user, if the number is not within the valid range (1–6), we display an alert and early exit the function using return.

Secondly, we reference both the results label and the diceImages container, then initialize two arrays one to store the number results 'values' of the dice rolls and another to store the HTML string for each dice image.

Lastly, we loop through the specified number of times to generate random values, populate our arrays, and then update the results label with the values that were rolled aswell as add all the images to the diceImages div container that will display each value with the image.
```
function rollDice(sumbitBtn){
    const number = document.querySelector('.number').value;
    if (number < 1 || number > 6) {
        window.alert("Number Must Be Between (1 - 6)");
        return;
    }
    
    const results = document.getElementById("results");
    const diceImages = document.getElementById("images_container");

    const values = [];
    const images = [];

    for(let i = 0; i < number; i++){
        const value = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        values.push(value);
        images.push(`<img src="dice_images/${value}.png" alt="Not Found Dice: ${value}">`);
    }

    results.textContent = `Dice: ${values.join(", ")}`;
    diceImages.innerHTML = images.join("");
}
```
