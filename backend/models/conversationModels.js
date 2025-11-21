import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId, //It basically means that this field will store ObjectId values that reference documents in another collection.
            ref: "User" //Reference to User model and this is used to establish a relationship between two collections in MongoDB. In this case, it indicates that the participants field in the conversationSchema references documents from the User collection.
        }
    ],
    messages : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, {timestamps: true}) //this will automatically add createdAt and updatedAt fields to the schema)


const Conversation = mongoose.model("Conversation", conversationSchema); //this will create a model named Conversation using the conversationSchema and this model will be used to interact with the conversations collection in the database

export default Conversation; // export the Conversation model so that it can be used in other parts of the application