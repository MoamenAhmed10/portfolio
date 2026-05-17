const express = require("express");
const { login } = require("../controllers/auth.controller");

const router = express.Router();

/**
 * POST /api/auth/login
 * Login with admin password
 */
router.post("/login", login);

module.exports = router;
