import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-routes.js";
import userRoutes from "./routes/user-routes.js";
import connectDB from "./config/mongoose-connection.js";
import { app , server} from "./socket/socket.js";

//--------------------------------------------Variables-----------------------------------


const PORT = process.env.PORT || 5000;

//--------------------------------------------Middlewares---------------------------------
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser())

app.get("/" , (req, res)=>{
    res.send("Server is running")
})

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)




server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running on port ${PORT}`)
})