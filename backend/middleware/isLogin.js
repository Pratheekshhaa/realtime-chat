import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(500).send({sucess:false, message:"User Unauthenticated"});
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(500).send({sucess:false, message:"User Unauthenticated,Invalid Token"});
        }
        const user = User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(500).send({sucess:false, message:"User Not Found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(`error in isLogin middleware: ${error} `);
        res.status(500).send({sucess:false, message:"User Unauthenticated,Something went wrong"});
    }
};

export default isLogin;