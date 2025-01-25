import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const protectRoute = async(req ,res , next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                status: "Unauthorized - No token provided",
            });
        }
        const verify = jwt.verify(token , process.env.JWT_SECRET);
        if(!verify)
        {
            return res.status(401).json({
                status: "Unauthorized - Invalid Token",
            });
        }

        const user = await User.findById(verify.userID).select("-password");

        if(!user){
            return res.status(404).json({message : "user not found"});
        }

        req.user = user;
        next();

        
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            message: error.message
        })
    }
}

export default protectRoute;