import User from "../models/user-model.js";
import encrypt from "../utils/encrypt.js"
import decrypt from "../utils/decrypt.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req , res)=>{
    try {
        const {fullname , username , password , confirmPassword , gender } = req.body;
        if (password !== confirmPassword)
        {
            return res.status(400).json({error : "Invalid Password"})
        }
        const user = await User.findOne({username});

        if(user) return res.status(400).json({error : "Username already exist"});
        
        // Hash Password
        const hashedPassword = await encrypt(password);

        // Picture placeholder api
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })
        if(newUser)
        {
            generateTokenAndSetCookie(newUser._id , res);

            await newUser.save();
            
            res.status(201).json({
                _id: newUser._id,
                fullname : newUser.fullname,
                username : newUser.username,
                profilePic: newUser.profilePic,
            })
        }else{
            res.status(400).json({
                status : "Failed",
                message : "Invalid Data"
            })
        }
    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error.message
        })
    }
}


export const login =async (req , res)=>{
      try {
        let {username , password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = decrypt(password , user?.password || "");

        if(!user || !isPasswordCorrect)
        {
            return res.status(400).json({error : "Invalid User"});
        }
        generateTokenAndSetCookie(user._id , res);
        res.status(200).json({
			_id: user._id,
            fullname: user.fullname,
			username: user.username,
			profilePic: user.profilePic,
		});

      } catch (error) {
            res.status(400).json({
                status : "failed",
                message : error.message
            })
      }
}


export const logout = (req , res)=>{
    try {
        res.cookie("token" , "" , {maxAge : 0});
        res.status(200).json({ message : "Logout success"});
    } catch (error) {
        res.status(500).json({
            status : "failed",
            message : error.message
        })
        
    }
}