import bcrypt from "bcryptjs";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let otpStore = {}; // { email: { otp, expiresAt } }

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email đã được đăng ký" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi đăng ký", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Sai mật khẩu" });

    res.status(200).json({ message: "Đăng nhập thành công", user });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi đăng nhập", error: err.message });
  }
};

// 👉 Gửi OTP khi quên mật khẩu
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email không tồn tại" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 phút

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Mã OTP khôi phục mật khẩu",
      text: `Mã OTP của bạn là: ${otp}`,
    });

    res.json({ message: "OTP đã được gửi đến email của bạn" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi gửi OTP", error: err.message });
  }
};

// 👉 Xác minh OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];
  if (!record) return res.status(400).json({ message: "Không có OTP cho email này" });
  if (record.expiresAt < Date.now()) return res.status(400).json({ message: "OTP đã hết hạn" });
  if (record.otp.toString() !== otp.toString()) return res.status(400).json({ message: "Sai OTP" });

  res.json({ message: "Xác thực OTP thành công" });
};

// 👉 Đổi mật khẩu sau khi xác minh OTP
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const record = otpStore[email];
  if (!record) return res.status(400).json({ message: "Chưa xác minh OTP" });

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    delete otpStore[email];
    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi đặt lại mật khẩu", error: err.message });
  }
};
