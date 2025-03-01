import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-routes.js";
import userRoutes from "./routes/user-routes.js";
import connectDB from "./config/mongoose-connection.js";
import { app , server} from "./socket/socket.js";
import path from "path";
//--------------------------------------------Variables-----------------------------------


const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

//--------------------------------------------Middlewares---------------------------------
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "/frontend/dist")))

//--------------------------------------------Routes---------------------------------------
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "frontend" ,"dist", "index.html"))
})




server.listen(PORT, ()=>{
    connectDB();
})