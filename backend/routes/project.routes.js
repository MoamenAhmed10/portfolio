const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { uploadProjectImage } = require("../config/upload.config");

router.get("/", projectController.getAllProjects);
router.get("/featured", projectController.getFeaturedProjects);
router.get("/:id", projectController.getProject);
router.post(
  "/",
  uploadProjectImage.single("image"),
  projectController.createProject
);
router.put(
  "/:id",
  uploadProjectImage.single("image"),
  projectController.updateProject
);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
