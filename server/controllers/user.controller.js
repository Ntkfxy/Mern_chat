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
const cloudinary = require("../configs/cloudinary");

/**
 * =========================
 * REGISTER (สมัครสมาชิก)
 * =========================
 */
const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  // ตรวจสอบ input
  if (!fullName || !email || !password) {
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
      fullName,
      email,
      password: hashedPassword,
    });

    // สร้าง JWT token
    const token = jwt.sign({ id: user._id, fullName: user.fullName }, secret, {
      expiresIn: "1d",
    });

    // ส่ง response ตาม format ที่ต้องการ
    res.status(201).json({
      message: "User Register in successfully",
      id: user._id,
      fullName: user.fullname,
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

    // สร้าง JWT token
    const token = jwt.sign({ id: user._id, fullName: user.fullName }, secret, {
      expiresIn: "1d",
    });

    // เก็บ token ลง cookie
    res.cookie("token", token, {
      httpOnly: true, // JS ฝั่ง client อ่านไม่ได้
      secure: process.env.NODE_ENV === "production", // https เท่านั้นใน production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 วัน
    });

    // ส่งข้อมูล user กลับ (ไม่ส่ง token)
    res.json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some errors occurred while logging in user",
    });
  }
};

// ฟังก์ชันสำหรับ logout โดยลบ cookie token
const logOut = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 }); // ลบ cookie โดยตั้งค่าเป็นค่าว่างและหมดอายุทันที
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some errors occurred while logging out user",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const fullName = req.body?.fullName;
    const profilePic = req.body?.profilePic;
    const userId = req.user._id;

    if (fullName && profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);

      if (!uploadResponse) {
        return res.status(500).json({
          message: "Error while uploading profile picture",
        });
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          fullName: fullName,
          profilePic: uploadResponse.secure_url,
        },
        { new: true },
      );

      if (!updatedUser) {
        return res.status(500).json({
          message: "Error while updating user profile",
          user: updatedUser,
        });
      }

      return res.json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
    } else if (fullName) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { fullName: fullName },
        { new: true },
      );

      if (!updatedUser) {
        return res.status(500).json({
          message: "Error while updating user profile",
        });
      }

      return res.json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
    } else if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);

      if (!uploadResponse) {
        return res.status(500).json({
          message: "Error while uploading profile picture",
        });
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true },
      );

      if (!updatedUser) {
        return res.status(500).json({
          message: "Error while updating Picture profile",
        });
      }

      return res.json({
        message: "Picture profile updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error while updating ProfilePicture",
    });
  }
};

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while checking auth" });
  }
};

// export ฟังก์ชันไปใช้ใน router
module.exports = { register, login, logOut, updateProfile, checkAuth };
