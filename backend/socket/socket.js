import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // Update this to include your production URL
        origin: ["http://localhost:3000", "https://chatme-production.onrender.com"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

const userSocketMap = {}; 

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log("User added to socket map:", userId);
        
        // Emit online users immediately after connection
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    // socket.on() is used to listen to the events
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        
        // Find and remove the user from the userSocketMap
        for (const [key, value] of Object.entries(userSocketMap)) {
            if (value === socket.id) {
                delete userSocketMap[key];
                console.log("User removed from socket map:", key);
                break;
            }
        }
        
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // to update the online users list
    });
});

export { app, io, server };