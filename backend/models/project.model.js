const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  technologies: [
    {
      type: String,
    },
  ],
  liveUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
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

projectSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model("Project", projectSchema);
