// external modules
const express = require("express");
const { Server } = require("socket.io");// npm i socket.io, 
const cors = require("cors");
const morgan = require("morgan");
const { createLogger, format } = require("winston");
require("dotenv").config();

// nested modules
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3001;// պորտը վերցնում ենք .env-ից
const app = express();// express-шի դեպքում ստեղծվում է server
const server = http.createServer(app);//http -ի դեպքում server-ի ստեղծում, միայն socket-ով պրոյեկտ չի ստեղծվում, միայն http-ի միջոցով
const io = new Server(server);//նոր սերվեր socket-ով աշխատելու համար 

app.use(express.static(path.join(__dirname, "/public")));// front-ի վիզուալիզացիայի համար

const corsOptions = {
    origin: "*", //  or "http://localhost:3000"
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"]
};

const logger = createLogger({
    level: 'info', //փոխարինում է console.log-ին , console.error-ին
    format: format.combine(
        format.timestamp(),
        format.json()
    )
});

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

//js variables
const socketesConnected = new Set();

io.on("connection", (socket) => {// default event - connection
    logger.info(`Socket connected: ${socket.id}`);// յուր. socket === 1 user
    socketesConnected.add(socket.id);// add - set-ի մեթոդներից
    io.emit("clients-total", socketesConnected.size); //server-ից ինֆո է ուղարկում client-Ին

    socket.on("message", (data) => {
        logger.info(data);
        io.emit("chat-message", data)
    });

    socket.on("feedback", (data) => {
        socket.broadcast.emit("feedback", data)
    });

//     socket.on("disconnect", () => {
//         socketesConnected.delete(socket.id);
//         io.emit("clients-total", socketesConnected.size);
//         logger.info(`Socket disconnected: ${socket.id}`)
//     });

});

server.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
});







// import {MongoClient} from "mongodb";//փորձել նաև Mongoose-ով
// const client = new MongoClient("mongodb://localhost:27017");

// (async function () {
//     await client.connect();
//     const cleanup = (event) => {
//         client.close();
//         process.exit();
//     };
//     process.on("SIGINT", cleanup);
//     process.on("SIGTERM", cleanup);    
//     const db = client.db("example");
//     const collection = db.collection("alfa");
//     await collection.insertOne({a : 1})
// })();


