import express from "express";
console.log("Loading auth routes...");

const router = express.Router();

// POST /api/auth/register
router.post("/register", (req, res) => {
  res.status(501).json({ message: "register not implemented yet" });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  res.status(501).json({ message: "login not implemented yet" });
});

export default router;
