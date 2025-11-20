import User from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import jwtToken from "../utils/jwtwebToken.js";  // note to myself: if i say default export then dont use { } while importing if i havent put default and its for a function or const i named then use { } while importing

export const userRegister = async(req,res) => {
    try{
        const {fullname, username, email, gender, password, profilepic} = req.body; //send all the data from frontend
        const user = await User.findOne({username, email}); //check if user already exists
        if (user) return res.status(500).send({success: false, message:"UserName or Email already exists"});
        //we need to hash the password before saving it to the database for security reasons
        const hashPassword = bcryptjs.hashSync(password,10); //10 is the number of rounds for hashing

        const profileBoy = profilepic || "https://avatar.iran.liara.run/public/boy?username={username}";
        const profileGirl = profilepic || "https://avatar.iran.liara.run/public/girl?username={username}";

        const newUser = new User ({
            fullname, 
            username,
            email,
            password: hashPassword,
            gender,
            profilepic : gender ==="male" ? profileBoy : profileGirl
        });

        if (newUser){
            await newUser.save();
            jwtToken(newUser._id, res); //generate jwt token and send it as cookie
        } else {
            res.status(500).send({success: false, message:"Error while registering user"});
        }
        res.status(201).send({
            _id : newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic,
            email: newUser.email,
            gender: newUser.gender,

        })

    }catch (error){
        res.status(500).send({success: false, message: error.message});
        console.log("Error in user registration:", error);
    }
}

export const userLogin = async(req,res) => { // async function to handle user login because asynchronous operations are involved which means we have to wait for some operations to complete like database queries
    try {
        const {email, password} = req.body; //take this data from frontend
        const user =await User.findOne({email}); //find user with this email in database
        if (!user) return res.status(500).send({success: false, message:"User not found with this email"}); //if user not found send error response
        const comparePassword = bcrypt.js.compareSync(password, user.password); //compare the password entered by user with the hashed password stored in database and comparesync can be used instead of await because it is a synchronous operation
        if (!comparePassword) return res.status(500).send({success: false, message:"Incorrect Password"}); //if password does not match send error response

        jwtToken(user._id, res); //generate jwt token and send it as cookie

        res.status(200).send({
            _id : user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic,
            email: user.email,
            gender: user.gender,
            message:"Login Successful"
        })
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
        console.log("Error in user Login:", error);
    }
}

export const userLogout = async(req,res) => {
    try {
        res.cookie('jwt', null, { //set the cookie to null to logout the user)
            maxAge:0,
        })
        res.status(200).send({success: true, message:"Logout Successful"});
    }catch (error) {
        res.status(500).send({success: false, message: error.message});
        console.log("Error in user Logout:", error);
    }
}