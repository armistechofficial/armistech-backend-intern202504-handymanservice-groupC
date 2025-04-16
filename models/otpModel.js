import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

async function sendVerification(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h3>Please confirm your OTP</h3><p>Here is your OTP code: ${otp}</p>`
    );
  } catch (error) {
    console.log("Error while sending email: ", error);
    throw new Error("Failed to send verification email.");
  }
}


otpSchema.pre("save", async function (next) {
  console.log("new document saved to the database");
  if (this.isNew) {
    await sendVerification(this.email, this.otp);
  }
  next();
});

export const OTP = mongoose.model("OTP", otpSchema);
