const jwt = require("jsonwebtoken");

/**
 * Login with admin password
 * POST /auth/login
 * Body: { password: string }
 */
const login = (req, res) => {
  const { password } = req.body;
  const isProduction = process.env.NODE_ENV === "production";

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  // In production, auth secrets must be explicitly configured.
  const adminPassword = process.env.ADMIN_PASSWORD || (!isProduction ? "admin123" : null);
  const jwtSecret = process.env.JWT_SECRET || (!isProduction ? "your-secret-key" : null);

  if (!adminPassword || !jwtSecret) {
    return res.status(500).json({
      message: "Server authentication is not configured",
    });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token (expires in 24 hours)
  const token = jwt.sign(
    { role: "admin" },
    jwtSecret,
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
