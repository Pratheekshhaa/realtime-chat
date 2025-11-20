import User from "../models/userModels.js";

export const userRegister = async(req,res) => {
    try{
        const {fullname, username, email, gender, password, profilepic} = req.body; //send all the data from frontend
        const user = await User.findOne({username, email}); //check if user already exists
        if (user) return res.status(500).send({success: false, message:"UserName or Email already exists"});
    }catch (error){

    }
}