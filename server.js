// external modules
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
require("dotenv").config();

// nested modules
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);//միայն socket-ով պրոյեկտ չի ստեղծվում, միայն http-ի միջոցով
const io = new Server(server);//ուսումնասիրել տանը 

app.use(express.static(path.join(__dirname, "/public")));

app.use(cors());// գրել cors setting
app.use(express.json());

//js variables
const socketesConnected = new Set();

io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);
    socketesConnected.add(socket.id);
    io.emit("clients-total", socketesConnected.size);

    socket.on("message", (data) => {
        console.log(data);
        io.emit("chat-message", data)
    });

    socket.on("feedback", (data) => {
        socket.broadcast.emit(data)
    })
});

//գրել winston-ի setting-ները
server.listen(port, () => {
    console.log("Server is listening on port 3001")// փոխարինել winston-ով
});






