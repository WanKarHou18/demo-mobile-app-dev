const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const paymentMethodPath = path.join(
  __dirname,
  "..",
  "db",
  "payment_method.json"
);

router.get("/payment_method", (req, res) => {
  fs.readFile(paymentMethodPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load payment methods" });
    }
    const methods = JSON.parse(data);
    res.json(methods);
  });
});

module.exports = router;
