const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const { uploadImage } = require("../config/upload.config");

router.get("/", profileController.getProfile);
router.post(
  "/",
  uploadImage.single("photo"),
  profileController.createOrUpdateProfile
);
router.put(
  "/",
  uploadImage.single("photo"),
  profileController.createOrUpdateProfile
);
router.post(
  "/photo",
  uploadImage.single("photo"),
  profileController.uploadPhoto
);
router.delete("/", profileController.deleteProfile);

module.exports = router;
