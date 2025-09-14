const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Path to food_beverage.json
const foodBeveragePath = path.join(__dirname, "..", "db", "food_beverage.json");

// Route: /foodbeverage/items
router.get("/items", (req, res) => {
  fs.readFile(foodBeveragePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to load food and beverage items" });
    }
    const items = JSON.parse(data);
    res.json(items);
  });
});

module.exports = router;
