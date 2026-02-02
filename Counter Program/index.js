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
