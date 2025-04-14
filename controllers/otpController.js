import { OTP } from '../models/otpModel.js';
import otpGenerator from 'otp-generator';

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

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

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp //  Remove in production
    });
  } catch (error) {
console.error("Send OTP Error:", error);
  res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};
