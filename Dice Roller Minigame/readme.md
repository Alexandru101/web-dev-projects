# Dice-Roller-Minigame Documentation
<img width="1011" height="849" alt="image" src="https://github.com/user-attachments/assets/572dfc16-aefa-496b-8b56-486c24c64b0a" />

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

## Setup Instructions

- Download [Visual Studio Code](https://code.visualstudio.com/) and make sure to have "Live Server" extension installed
- Create a folder for the project and make sure to change the html stylesheet "href" to look for your projects file name
- Create three files within that folder for index.html, index.js and style.css.
- Create a folder for the dice images and make sure it matches the 'index.js' images.push src location (can be found on line 20 - default folder name is dice_images but you can change this)
- Press "Go Live" at the bottom of your visual studio code (IDE)
