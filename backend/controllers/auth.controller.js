const jwt = require("jsonwebtoken");

/**
 * Login with admin password
 * POST /auth/login
 * Body: { password: string }
 */
const login = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  // Check against the ADMIN_PASSWORD from environment
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password !== adminPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token (expires in 24 hours)
  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET || "your-secret-key",
    {
      expiresIn: "24h",
    },
  );

  return res.status(200).json({
    token,
    expiresIn: 86400, // 24 hours in seconds
  });
};

module.exports = {
  login,
};
