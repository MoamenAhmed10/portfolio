const Experience = require("../models/experience.model");

// Get all experience entries
exports.getAllExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort({
      order: 1,
      startDate: -1,
    });
    res.json(experience);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching experience", error: error.message });
  }
};

// Get single experience entry
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching experience", error: error.message });
  }
};

// Create experience entry
exports.createExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating experience", error: error.message });
  }
};

// Update experience entry
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating experience", error: error.message });
  }
};

// Delete experience entry
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting experience", error: error.message });
  }
};
