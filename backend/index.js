import express from "express"
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js"; //.js because its type is module
import authRouter from "./route/authUser.js";
import messageRouter from "./route/messageRouter.js";
import cookieParser from "cookie-parser";

const app=express();

dotenv.config(); //we can access the .env from anywhere

app.use(express.json()); //to parse json data from frontend 

app.use(cookieParser()); //to parse cookies

app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)

app.get("/",(req,res)=>{
    res.send("Server is running");
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    dbConnect();
    console.log(`Working at ${PORT} `);
})