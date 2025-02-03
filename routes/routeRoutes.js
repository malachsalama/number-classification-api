const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Number Classification API!",
    example_usage: "/api/classify-number?number=371",
  });
});

module.exports = router;
