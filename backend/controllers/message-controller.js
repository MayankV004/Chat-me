import conversation from "../models/conversation-model.js";
import Message from "../models/message-model.js";


export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverID} = req.params; // renameing id to receiverID
        const senderID = req.user._id;

        let convo = await conversation.findOne({
            participants: { $all: [senderID , receiverID]},
        })

        if(!convo)
        {
            convo = await conversation.create({
                participants: [senderID , receiverID ],

            })
        }

        const newMessage = new Message({
            senderID:senderID,
            receiverID:receiverID,
            message : message
        })

        
        if(newMessage)
        {
            convo.messages.push(newMessage._id);
        }
        await Promise.all([convo.save(),newMessage.save()]) // faster and run in parallel

        res.status(201).json({message : newMessage})

    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error.message
        })
    }
}

export const getMessages = async(req, res)=>{
    try {
        const {id:userToChat} = req.params;
        const senderID = req.user._id;
        const convo = await conversation.findOne({
            participants:{$all : [senderID , userToChat]},
        }).populate("messages");

        // if no message is there
        if(!convo) return res.status(200).json([]);
        const messages = convo.messages

        res.status(201).json({message : messages})
    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error.message
        })
    }
}