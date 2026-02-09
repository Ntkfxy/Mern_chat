//commaonts to explain what this file is about
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const DB_URL = process.env.DB_URL;
const CLIENT_URL = process.env.CLIENT_URL;

//import router
const UserRouter = require("./routers/user.router");
// const PostRouter = require("./routers/post.router");

const app = express();
const PORT = process.env.PORT;

//middleware หน้าที่เป็นตัวกลาง
//แปลงข้อมูลที่รับมาให้อยู่ในรูปเเบบ json
app.use(express.json());

//อนุญาติให้ทุกคนเข้าถึง server ได้
app.use(
  cors({
    //อนุญาติให้ส่ง cookie ข้าม domain ได้
    credentials: true,
    //อนุญาติให้ client ที่มาจาก BASE_URL เชื่อมต่อกับ server ได้
    origin: CLIENT_URL,
    //อนุญาติให้ใช้ method อะไรบ้าง นอกเหนือจากนี้จะไม่อนุญาติ
    methods: ["GET", "POST", "PUT", "DELETE"],
    //อนุญาติให้ใช้ header อะไรบ้าง
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  }),
);
//ต้องใช้ตัวนี้ในการจัดการ cookie
app.use(cookieParser());

//อนุญาติบาง method ใช้แบบนี้ได้
// server ส่งหา  client หากเชื่อมต่อกันถูกต้อง
app.get("/", (req, res) => {
  res.send("<h1>Welcome to  MERN CHAT SERVER</h1>");
});

//เชื่อมต่อฐานข้อมูล
if (!DB_URL) {
  console.error("DB_URL is missing. please set it in your .env file.");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error", error.message);
    });
}

//configure port and listen port
//ทำหน้าที่เป็น call back functions
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Router
app.use("/api/v1/user", UserRouter);
console.log("🔥 BEFORE POST ROUTER");
// app.use("/api/v1/post", PostRouter);
// console.log("🔥 AFTER POST ROUTER");
