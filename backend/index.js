import express from "express"
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js"; //.js because its type is module

const app=express();

dotenv.config(); //we can access the .env from anywhere

app.get("/",(req,res)=>{
    res.send("Server is running");
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    dbConnect();
    console.log(`Working at ${PORT} `);
})