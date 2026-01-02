const express = require("express");
const router = express.Router();

// temporary in-memory users (DB later)
const users = {};
const otps = {};

// SIGNUP
router.post("/signup", (req, res) => {
  const { email, uid } = req.body;
  if (!email || !uid) return res.json({ error: "Missing data" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otps[email] = otp;

  console.log("OTP:", otp); // later email/SMS

  users[email] = { uid, verified: false };
  res.json({ success: true, otpSent: true });
});

// VERIFY OTP
router.post("/verify", (req, res) => {
  const { email, otp } = req.body;

  if (otps[email] == otp) {
    users[email].verified = true;
    req.session.user = users[email];
    return res.json({ success: true });
  }

  res.json({ error: "Invalid OTP" });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email } = req.body;

  if (users[email]?.verified) {
    req.session.user = users[email];
    return res.json({ success: true });
  }

  res.json({ error: "User not found" });
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;
