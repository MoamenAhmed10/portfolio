const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill.controller");

router.get("/", skillController.getAllSkills);
router.get("/category/:category", skillController.getSkillsByCategory);
router.get("/:id", skillController.getSkill);
router.post("/", skillController.createSkill);
router.put("/:id", skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill);

module.exports = router;
