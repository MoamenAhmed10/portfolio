const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

aboutSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model("About", aboutSchema);
