import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderID : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
    
}, {timestamps:true}); // by using timestamp we get createdAt and updatedAt

const Message = mongoose.model("Message",messageSchema);

export default Message;