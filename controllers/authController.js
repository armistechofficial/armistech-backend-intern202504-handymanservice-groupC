import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OTP } from "../models/otpModel.js";
import otpGenerator from 'otp-generator';


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
      user_type,
      bio,
      expertise,
      location,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !phoneNumber ||
      !address ||
      !password ||
      !confirmPassword ||
      !user_type
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
      user_type,
      bio,
      expertise,
      location,
      isVerified: false,
    });
    const { password: _, ...userWithoutPassword } = newUser._doc;

    let otp;
    let existingOtp;

    // Ensure OTP is unique
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOtp = await OTP.findOne({ otp });
    } while (existingOtp);

    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    console.log(`OTP for ${email}: ${otp}`); // For dev

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: userWithoutPassword,
        otp,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  const { email, otp } = req.body;
  const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
  if (response.length === 0 || otp !== response[0].otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired OTP.",
    });
  }

  await User.updateOne({ email }, { isVerified: true });
  res.status(200).json({
    success: true,
    message: "OTP verified successfully.",
  });
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
