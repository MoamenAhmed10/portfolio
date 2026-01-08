const Contact = require("../models/contact.model");

// Get contact information
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    res.json(contact || {});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching contact", error: error.message });
  }
};

// Create or update contact information
exports.createOrUpdateContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();

    if (contact) {
      Object.assign(contact, req.body);
      contact.updatedAt = Date.now();
      await contact.save();
    } else {
      contact = new Contact(req.body);
      await contact.save();
    }

    res.json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving contact", error: error.message });
  }
};

// Delete contact information
exports.deleteContact = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "Contact information deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: error.message });
  }
};
