const Project = require("../models/project.model");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};

// Get featured projects
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching featured projects",
      error: error.message,
    });
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching project", error: error.message });
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const projectData = { ...req.body };

    if (req.file) {
      projectData.image = `/uploads/projects/${req.file.filename}`;
    }

    // Parse technologies if it's a string
    if (typeof projectData.technologies === "string") {
      projectData.technologies = projectData.technologies
        .split(",")
        .map((t) => t.trim());
    }

    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const projectData = { ...req.body, updatedAt: Date.now() };

    if (req.file) {
      // Delete old image if exists
      const oldProject = await Project.findById(req.params.id);
      if (oldProject && oldProject.image) {
        const oldImagePath = path.join(__dirname, "..", oldProject.image);
        if (oldImagePath) {
          deleteFileAsync(oldImagePath);
        }
      }
      projectData.image = `/uploads/projects/${req.file.filename}`;
    }

    // Parse technologies if it's a string
    if (typeof projectData.technologies === "string") {
      projectData.technologies = projectData.technologies
        .split(",")
        .map((t) => t.trim());
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true, runValidators: true },
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete associated image
    if (project.image) {
      const imagePath = path.join(__dirname, "..", project.image);
      if (imagePath) {
        deleteFileAsync(imagePath);
      }
    }

    // Async file delete helper (non-blocking)
    async function deleteFileAsync(filePath) {
      try {
        if (filePath && fs.existsSync(filePath)) {
          await fsPromises.unlink(filePath);
        }
      } catch (err) {
        console.warn(`Could not delete file: ${filePath}`, err && err.message);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
};
