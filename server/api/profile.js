const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Path to the profile_info.json
const profilePath = path.join(__dirname, "..", "db", "profile_info.json");

// GET /profile_info
router.get("/profile_info", (req, res) => {
  fs.readFile(profilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load profile info" });
    }
    const profile = JSON.parse(data);
    res.json(profile);
  });
});

module.exports = router;
