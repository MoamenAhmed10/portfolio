const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/about.controller");

router.get("/", aboutController.getAbout);
router.post("/", aboutController.createOrUpdateAbout);
router.put("/", aboutController.createOrUpdateAbout);
router.delete("/", aboutController.deleteAbout);

module.exports = router;
