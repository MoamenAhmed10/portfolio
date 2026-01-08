const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Frontend",
      "Backend",
      "Database",
      "DevOps",
      "Tools",
      "Languages",
      "Other",
    ],
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 50,
  },
  icon: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

skillSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model("Skill", skillSchema);
