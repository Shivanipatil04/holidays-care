const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");

const {
  register,
  login,
  getCurrentUser
} = require("../controllers/authController");


/*
POST /api/auth/register
Create admin (initial setup)
*/
router.post("/register", register);


/*
POST /api/auth/login
Admin login
*/
router.post("/login", login);


/*
GET /api/auth/me
Get logged-in user
*/
router.get("/me", authMiddleware, getCurrentUser);


module.exports = router;
