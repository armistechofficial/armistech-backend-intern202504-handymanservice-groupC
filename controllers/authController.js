import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "secretKey";

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      address,
      password,
      confirmPassword,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !phoneNumber ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const isUserExist = await User.findOne({
      $or: [{ email }, { username }, { phoneNumber }],
    });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hashing the password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      address,
      password: hashedPassword,
    });
    const { password: _, ...userWithoutPassword } = newUser._doc;

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: userWithoutPassword,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email: email });

    if (!isUserExist) {
      throw new Error("Email or Password not valid.");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordValid) {
      throw new Error("Email or Password not valid.");
    }

    const token = jwt.sign({ id: isUserExist._id }, secretKey, {
      expiresIn: "1d",
    });

    const { password: _, ...userWithoutPassword } = isUserExist._doc;

    res.json({
      success: true,
      message: "User Logged-In successfully!",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
