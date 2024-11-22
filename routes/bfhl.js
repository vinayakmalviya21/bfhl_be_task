const express = require("express");
const { processData } = require("../utils/helper");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    console.log("Received Request Body:", req.body); 

    const { data } = req.body;

    if (!Array.isArray(data)) {
      console.error("Invalid input data:", data);
      return res.status(400).json({ is_success: false, message: "Invalid input data" });
    }

    const result = processData(data, req.body.file_b64);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ is_success: false, error: error.message });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

module.exports = router;
