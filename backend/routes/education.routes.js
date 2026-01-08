const express = require("express");
const router = express.Router();
const educationController = require("../controllers/education.controller");

router.get("/", educationController.getAllEducation);
router.get("/:id", educationController.getEducation);
router.post("/", educationController.createEducation);
router.put("/:id", educationController.updateEducation);
router.delete("/:id", educationController.deleteEducation);

module.exports = router;
