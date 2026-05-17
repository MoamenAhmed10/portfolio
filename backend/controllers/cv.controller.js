const CV = require("../models/cv.model");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

function resolveStoredPath(storedPath) {
  if (!storedPath) {
    return null;
  }

  return path.join(__dirname, "..", storedPath.replace(/^\/+/, ""));
}

// Get CV
exports.getCV = async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ createdAt: -1 });
    res.json(cv || {});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching CV", error: error.message });
  }
};

// Upload CV
exports.uploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Delete old CV if exists
    const oldCV = await CV.findOne();
    if (oldCV) {
      const oldPath = resolveStoredPath(oldCV.path);
      if (oldPath) {
        deleteFileAsync(oldPath);
      }
      await CV.deleteOne({ _id: oldCV._id });
    }

    const cv = new CV({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `/uploads/cv/${req.file.filename}`,
      size: req.file.size,
    });

    await cv.save();
    res.status(201).json(cv);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading CV", error: error.message });
  }
};

// Delete CV
exports.deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOne();
    if (cv) {
      const cvPath = resolveStoredPath(cv.path);
      if (cvPath) {
        deleteFileAsync(cvPath);
      }
      await CV.deleteOne({ _id: cv._id });
    }

    // Async file delete helper (non-blocking)
    async function deleteFileAsync(filePath) {
      try {
        if (filePath && fs.existsSync(filePath)) {
          await fsPromises.unlink(filePath);
        }
      } catch (err) {
        console.warn(`Could not delete file: ${filePath}`, err && err.message);
      }
    }
    res.json({ message: "CV deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting CV", error: error.message });
  }
};

// Download CV
exports.downloadCV = async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ createdAt: -1 });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    const filePath = resolveStoredPath(cv.path);
    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({ message: "CV file not found" });
    }

    res.download(filePath, cv.originalName);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error downloading CV", error: error.message });
  }
};
