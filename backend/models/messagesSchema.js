// to store the messages exchanged between users in a conversation

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId, // reference to the User who sent the message
        ref: "User", // we're getting it from the user
        required: true
    }, 
    receiverId:{
        type: mongoose.Schema.Types.ObjectId, // reference to the User who is the receiver of the message 
        ref: "User", // we're getting it from the user
        required: true
    }, 
    message:{
        type: String,
        required: true
    }, 
    conversationId:{  // so that the id of the conversation to which this message belongs can be stored
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation", // we're getting it from the conversation
        default: [] 
    },
}, {timestamps: true}) //this will automatically add createdAt and updatedAt fields to the schema)

const Message = mongoose.model("Message", messageSchema); //this will create a model named Message using the messageSchema and this model will be used to interact with the messages collection in the database

export default Message; // export the Message model so that it can be used in other parts of the application