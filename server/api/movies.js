const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Load movies data from JSON file
const moviesFilePath = path.join(__dirname, "..", "db", "movies.json");

router.get("/", (req, res) => {
  fs.readFile(moviesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load movies data" });
    }
    const movies = JSON.parse(data);
    res.json(movies);
  });
});

module.exports = router;
