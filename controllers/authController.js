import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
export const registerUser = async (req, res) => {
    try {
      const { firstName, lastName, username, email, phoneNumber, address, password, confirmPassword } = req.body;
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }
  
      const isUserExist = await User.findOne({ email: email });
  
      if (isUserExist) {
        return res.status(400).json({ message: "User already exists." });
      }
  
      // Hashing the password
      const salt = bcrypt.genSaltSync(10);
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
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  
