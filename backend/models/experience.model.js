const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  responsibilities: [
    {
      type: String,
    },
  ],
  technologies: [
    {
      type: String,
    },
  ],
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

experienceSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model("Experience", experienceSchema);
