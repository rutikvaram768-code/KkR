const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const CUSTOM_DIR = "models/commands/custom";

if (!fs.existsSync(CUSTOM_DIR)) fs.mkdirSync(CUSTOM_DIR, { recursive: true });

router.post("/upload", (req, res) => {
  const { name, code } = req.body;
  if (!name || !code) return res.json({ error: "Missing" });

  const filePath = path.join(CUSTOM_DIR, name + ".js");
  fs.writeFileSync(filePath, code);

  res.json({ success: true });
});

router.post("/delete", (req, res) => {
  const { name } = req.body;
  const filePath = path.join(CUSTOM_DIR, name + ".js");

  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  res.json({ success: true });
});

module.exports = router;
