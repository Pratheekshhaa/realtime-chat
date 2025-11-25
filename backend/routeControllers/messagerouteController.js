import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params; // Assuming the receiver's ID is passed as a URL parameter
        const senderId = req.user._id; // Assuming isLogin middleware attaches user info to req.user or use ._conditions._id;

        let chats = await Conversation.findOne({ // Check for existing conversation
            participants: { $all: [senderId, receiverId] }
        });
        if (!chats) { // If no conversation exists, create a new one
            chats = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            conversationId:chats._id
        });

        if (newMessage) {
            chats.messages.push(newMessage._id); // Add message reference to conversation
        }
        await Promise.all([chats.save(), newMessage.save()]); // Save both message and conversation promise is used because both are independent of each other
        res.status(201).send(newMessages)
    } catch (error) {
        res.status(500).send({success:false, message:"Failed to send message, Something went wrong"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:receiverId} = req.params; // Assuming the receiver's ID is passed as a URL parameter
        const senderId = req.user._id; // Assuming isLogin middleware attaches user info to req.user or use ._conditions._id;
        const chats = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] } // Find the conversation between the two users
        }).populate('messages'); // Populate messages that means get the message details instead of just ids
        if (!chats) {
            return res.status(200).send([]); // No conversation found, return empty array
        }
        const message = chats.messages;
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send({success:false, message:"Failed to fetch messages, Something went wrong"});
    }
}