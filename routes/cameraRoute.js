const express = require("express");
const router = express.Router();
const cors = require("cors");
const CameraController = require("../controllers/CameraController");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

// @route   POST /camera/
// @desc    Expects a base64 image
// @access  Public
router.post("/camera", cors(corsOptions), (req, res) => {
  CameraController(req)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
});

module.exports = router;
