const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv.controller");
const { uploadCV } = require("../config/upload.config");

router.get("/", cvController.getCV);
router.get("/download", cvController.downloadCV);
router.post("/", uploadCV.single("cv"), cvController.uploadCV);
router.delete("/", cvController.deleteCV);

module.exports = router;
