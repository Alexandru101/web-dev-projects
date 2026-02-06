const MIN = 1;
const MAX = 6;

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
