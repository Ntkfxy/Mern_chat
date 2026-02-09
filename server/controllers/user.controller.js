// import library สำหรับเข้ารหัสรหัสผ่าน
const bcrypt = require("bcrypt");

// import library สำหรับสร้าง JWT token
const jwt = require("jsonwebtoken");

// import Model ของ User จาก mongoose
const UserModel = require("../models/User");

// โหลดตัวแปรจากไฟล์ .env
require("dotenv").config();

// ดึง secret key สำหรับใช้ sign JWT
const secret = process.env.JWT_SECRET;

/**
 * =========================
 * REGISTER (สมัครสมาชิก)
 * =========================
 */
const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  // ตรวจสอบ input
  if (!fullname || !email || !password) {
    return res.status(400).json({
      message: "Please provide fullname, email and password",
    });
  }

  try {
    // เช็ค email ซ้ำ
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already existed",
      });
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // สร้าง user ใหม่
    const user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // สร้าง JWT token
    const token = jwt.sign({ id: user._id, fullname: user.fullname }, secret, {
      expiresIn: "1d",
    });

    // ส่ง response ตาม format ที่ต้องการ
    res.status(201).json({
      message: "User Register in successfully",
      id: user._id,
      fullname: user.fullname,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some errors occurred while registering user",
    });
  }
};

/**
 * =========================
 * LOGIN (เข้าสู่ระบบ)
 * =========================
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // ตรวจสอบ input
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  try {
    // หา user จาก email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ตรวจสอบ password
    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // login สำเร็จ → ส่งข้อมูล user กลับ
    res.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some errors occurred while logging in user",
    });
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some errors occurred while logging out user",
    });
  }
};

// export ฟังก์ชันไปใช้ใน router
module.exports = { register, login, logOut };
