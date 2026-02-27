const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MessageSchema = new Schema(
  {
    //ข้อความ
    text: { type: String },
    //ไฟล์
    file: { type: String },
    //ผู้ส่ง
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    //ผู้รับ
    recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const Message = model("Message", MessageSchema);
module.exports = Message;
