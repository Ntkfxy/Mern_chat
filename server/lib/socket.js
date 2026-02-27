const { log } = require("console");

require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
  },
});

const userSocketMap = []; //[{userId:socketId}]

function getRecipientSocketId(userId) {
  //return value
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    //ถ้า user ส่ง Id
    userSocketMap[userId] = socket.id;
    //log มาดูว่าใครออนไลน์บ้าง
    console.log("UserSocketMap", userSocketMap);
  }
  // online กี่คน
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //   socket.on("event", (data) => {
  //     /* … */
  //   });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    console.log("UserSocketMap", userSocketMap);
  });
});

module.exports = { io, app, server, getRecipientSocketId };
