const Education = require("../models/education.model");

// Get all education entries
exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, startDate: -1 });
    res.json(education);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching education", error: error.message });
  }
};

// Get single education entry
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.json(education);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching education", error: error.message });
  }
};

// Create education entry
exports.createEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating education", error: error.message });
  }
};

// Update education entry
exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.json(education);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating education", error: error.message });
  }
};

// Delete education entry
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting education", error: error.message });
  }
};
