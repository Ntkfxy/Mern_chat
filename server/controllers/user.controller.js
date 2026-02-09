const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).send({
      message: "Please provide fullname, email and password",
    });
  }
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      message: "This email is already existed",
    });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.status(201).send({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some errors occurred while registering a new user",
    });
  }

  //save login in cookie
  if (newUser) {
    const token = jwt.sign({ userId: newUser._id }, secret, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: node_mode === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    console.log("Token generated and cookie set");

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      fullname: newUser.fullname,
      profilePic: newUser.profilePic,
    });
  } else {
    res.status(400).json({ message: "User registration failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Please provide email and password",
    });
  }
  try {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordMatched = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordMatched) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    //login successfully
    jwt.sign(
      { fullname: userDoc.fullname, id: userDoc._id },
      secret,
      {},
      (err, token) => {
        if (err) {
          return res.status(500).send({
            message: "Internal server error: Authentication failed",
          });
        }
        //token generation
        res.send({
          message: "User logged in successfully",
          id: userDoc._id,
          fullname: userDoc.fullname,
          accessToken: token,
        });
      },
    );
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some errors occurred while logging in user",
    });
  }
};

module.exports = { register, login };
