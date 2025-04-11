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

    user_type: {
      type: Number,
      enum: [1, 2, 3],
      default: 3,
      required: [true, "User Type is required."]
    },

    bio: {
      type: String,
      validate :{
        validator: function(val){
          return this.user_type !==2 || (val && val.length>0);
        },
        message: "Provider's bio is required. ",
      },
    },
    expertise: {
      type: String,
      validate :{
        validator: function(val){
          return this.user_type !==2 || (val && val.length>0);
        },
        message: "Provider's expertise is required. ",
      },
    },
    location: {
      type: String,
      validate :{
        validator: function(val){
          return this.user_type !==2 || (val && val.length>0);
        },
        message: "Provider's location is required. ",
      },
    },
    rating: {
      type: Number,
    },
    reviews: {
      type: Number,
    },
    totalServices: {
      type: Number,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
