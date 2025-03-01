import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});


export const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId];
}

const userSocketMap = {}; 

io.on("connection" , (socket) => {
 

    const userId = socket.handshake.query.userId;
    if(userId != "undefined")
    {
        userSocketMap[userId] = socket.id;
    }

    // io.emit() is used to emit the event to all the connected users

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    // socket.on() is used to listen to the event

    socket.on("disconnect" , () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)) // to update the online users list
    })

})


export {app , io , server}