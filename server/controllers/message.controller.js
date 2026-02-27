const Message = require("../models/Messege");
const User = require("../models/User");
const cloudinary = require("../configs/cloudinary");
require("dotenv").config();

const getUserForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).selected("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error While getting users info" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { id: recipientId } = req.params;
    if (!recipientId) {
      return res.status(400).json({ message: "Recipient id is required" });
    }

    const senderId = req.user._id;
    const { text, file } = req.body;
    // if(text === "" && file ==="" ){
    //     return res.status(400).json({message: "Message is empty"});
    // }
    let fileUrl = "";
    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(file);
      fileUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      recipientId,
      text,
      file: fileUrl,
    });
    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error While sending message" });
  }
};
const getMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChat } = req.params;
    const message = await Message.find({
      $or: [
        {
          senderId: myId,
          recipientId: userToChat,
        },
        {
          senderId: userToChat,
          recipientId: myId,
        },
      ],
    });
    res.json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error While getting message" });
  }
};

const messageController = {
  getUserForSidebar,
  sendMessage,
  getMessage,
};

module.exports = messageController;
