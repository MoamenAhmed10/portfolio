const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience.controller");

router.get("/", experienceController.getAllExperience);
router.get("/:id", experienceController.getExperience);
router.post("/", experienceController.createExperience);
router.put("/:id", experienceController.updateExperience);
router.delete("/:id", experienceController.deleteExperience);

module.exports = router;
