const About = require("../models/about.model");

// Get about content
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    res.json(about || {});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching about content", error: error.message });
  }
};

// Create or update about content
exports.createOrUpdateAbout = async (req, res) => {
  try {
    const { title, description, highlights } = req.body;

    let about = await About.findOne();

    if (about) {
      about.title = title;
      about.description = description;
      about.highlights = highlights || [];
      await about.save();
    } else {
      about = new About({ title, description, highlights: highlights || [] });
      await about.save();
    }

    res.json(about);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving about content", error: error.message });
  }
};

// Delete about content
exports.deleteAbout = async (req, res) => {
  try {
    await About.deleteMany({});
    res.json({ message: "About content deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting about content", error: error.message });
  }
};
