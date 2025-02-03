const express = require("express");
const { classifyNumber } = require("../controllers/numberController");

const router = express.Router();

router.get("/classify-number", classifyNumber);

module.exports = router;
