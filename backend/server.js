const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Import middleware
const authMiddleware = require("./middleware/auth.middleware");

// Routes
const aboutRoutes = require("./routes/about.routes");
const educationRoutes = require("./routes/education.routes");
const experienceRoutes = require("./routes/experience.routes");
const projectRoutes = require("./routes/project.routes");
const skillRoutes = require("./routes/skill.routes");
const contactRoutes = require("./routes/contact.routes");
const cvRoutes = require("./routes/cv.routes");
const profileRoutes = require("./routes/profile.routes");
const authRoutes = require("./routes/auth.routes");

// Public auth routes (no protection)
app.use("/api/auth", authRoutes);

// Public GET routes (for portfolio viewing)
app.use("/api/about", aboutRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/profile", profileRoutes);

// Protect all admin modification routes with auth middleware
const adminProtectionMiddleware = (req, res, next) => {
  // Allow GET requests without authentication (for portfolio viewing)
  if (req.method === "GET") {
    return next();
  }

  // Protect POST, PUT, PATCH, DELETE operations
  authMiddleware(req, res, next);
};

app.use(adminProtectionMiddleware);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
