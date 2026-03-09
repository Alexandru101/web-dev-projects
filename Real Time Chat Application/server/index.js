// Importing Required Modules //
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 9000;

// Initializing Express and HTTP Server //
const app = express();
const server = http.createServer(app);

// Setting Up Socket.IO //
const io = socketIo(server);
const date = new Date();
let data = [];

// Functionality //
app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.emit('server_message', `Local Host: http://localhost:9000\nDate: ${date.toLocaleString()}`);
    socket.emit('server_data', data);

    socket.on('send_message', (msg) => {
        socket.broadcast.emit("send_message", msg);
        data.push(msg);
    });
});

server.listen(PORT, () => {
    console.log("Local Host: http://localhost:9000");
    console.log(`${date.getDate().toString().padStart(2, "0")}/${date.getMonth().toString().padStart()}/${date.getFullYear()}`);
});
