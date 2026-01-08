const Skill = require("../models/skill.model");

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json(skills);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching skills", error: error.message });
  }
};

// Get skills by category
exports.getSkillsByCategory = async (req, res) => {
  try {
    const skills = await Skill.find({ category: req.params.category }).sort({
      order: 1,
    });
    res.json(skills);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching skills", error: error.message });
  }
};

// Get single skill
exports.getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(skill);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching skill", error: error.message });
  }
};

// Create skill
exports.createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating skill", error: error.message });
  }
};

// Update skill
exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(skill);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating skill", error: error.message });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting skill", error: error.message });
  }
};
