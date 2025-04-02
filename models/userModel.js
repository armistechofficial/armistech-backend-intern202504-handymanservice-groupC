import mongoose from "mongoose";
import { addressSchema } from "./addressModel.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      minLength: 2,
      maxLength: 50,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email name is required."],
      trim: true,
      unique: true,
      match: [
        /^[^\@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address.",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      unique: true,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    address: [addressSchema],
    password: {
      type: String,
      required: [true, "Password required !"],
      minLength: 8,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
