const Profile = require("../models/profile.model");
const fs = require("fs");
const path = require("path");

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    res.json(profile || {});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

// Create or update profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const profileData = { ...req.body };

    if (req.file) {
      profileData.photo = `/uploads/images/${req.file.filename}`;
    }

    let profile = await Profile.findOne();

    if (profile) {
      // Delete old photo if new one is uploaded
      if (req.file && profile.photo) {
        const oldPhotoPath = path.join(__dirname, "..", profile.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      Object.assign(profile, profileData);
      profile.updatedAt = Date.now();
      await profile.save();
    } else {
      profile = new Profile(profileData);
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving profile", error: error.message });
  }
};

// Upload profile photo
exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let profile = await Profile.findOne();

    if (profile) {
      // Delete old photo
      if (profile.photo) {
        const oldPhotoPath = path.join(__dirname, "..", profile.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      profile.photo = `/uploads/images/${req.file.filename}`;
      profile.updatedAt = Date.now();
      await profile.save();
    } else {
      profile = new Profile({
        name: "Your Name",
        title: "Your Title",
        photo: `/uploads/images/${req.file.filename}`,
      });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading photo", error: error.message });
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (profile && profile.photo) {
      const photoPath = path.join(__dirname, "..", profile.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }
    await Profile.deleteMany({});
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting profile", error: error.message });
  }
};
