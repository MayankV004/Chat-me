import bcrypt from "bcryptjs"

const encrypt = async (password)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password , salt);
        return hash;
    } catch (error) {
        throw new Error("Error in Hashing");
    }
}

export default encrypt;