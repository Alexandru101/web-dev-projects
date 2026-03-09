// Grabbing User ID //
let userId = null;
const invalid_chars = ["/", ".", ",", "<", ">", "#", "~", ";", ":", "@", "'"];
while (!userId) {
    userId = window.prompt("Username");

    if (userId != null) {
        for (let char of userId) {
            for (let invalid_char of invalid_chars) { 
                if (char == invalid_char) {
                    userId = null;
                }
            }
        }
    }
}

// Essential Variables //
const msgContainer = document.getElementById("messages-container");
const socket = io();

// Functionality //
function sendMessage() {
    const textBox = document.getElementById("message-input");
    if (!textBox.value) { return; }

    const msg = document.createElement("div");
    msg.classList.add("message");
    msg.classList.add("sent-message");
    msg.textContent = `${userId}: ${textBox.value}`;
    msgContainer.append(msg);

    socket.emit('send_message', msg.textContent);
    textBox.value = "";
}

// Events //
document.getElementById("message-input").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        sendMessage();
    }
})

socket.on('server_message', (message) => {
    console.log(message);
})

socket.on('server_data', (data) => {
    data.forEach((msgContent, index) => {
        const msg = document.createElement("div");
        msg.classList.add("message");
        msg.classList.add("received-message");
        msg.textContent = msgContent;
        msgContainer.append(msg);
    })
})

socket.on('send_message', (message) => {
    const msg = document.createElement("div");
    msg.classList.add("message");
    msg.classList.add("received-message");
    msg.textContent = message;

    msgContainer.append(msg);
})
