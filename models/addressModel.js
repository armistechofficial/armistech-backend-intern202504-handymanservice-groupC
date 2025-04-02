import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
    contactPerson: {
      type: String,
      required: [true, "Contact Person name is required."],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    landmark: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Home", "Office"],
      required: true,
    },
  });