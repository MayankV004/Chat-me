import User from "../models/user-model.js";

export const getUsersForSidebar = async(req , res) =>{
    try {
        const currentUserId = req.user._id;
        const filteredUsers = await User.find({_id : { $ne : currentUserId}}).select("-password")

        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error.message
        })
    }
}