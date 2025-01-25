import bcrypt from "bcryptjs"

const decrypt = async (password , hash) => {
    try {
        const result = await bcrypt.compare(password , hash);
        return result;
    } catch (error) {
        throw new Error("Error in comparing the passwords ");
    }
}

export default decrypt;