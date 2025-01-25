import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log("Error in Connecting to MongoDB ", error.message);
    }
}
export default connectDB;