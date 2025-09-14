const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Paths to JSON files
const bookingSettingPath = path.join(
  __dirname,
  "..",
  "db",
  "booking_setting.json"
);

// Handler for /booking/booking_setting
router.get("/booking_setting", (req, res) => {
  fs.readFile(bookingSettingPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load booking settings" });
    }
    const bookingSettings = JSON.parse(data);
    res.json(bookingSettings);
  });
});

module.exports = router;
