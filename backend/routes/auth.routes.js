import express from "express";
import { register } from "../controllers/auth.controller.js";
console.log("Loading auth routes...");

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", (req, res) => {
  res.status(501).json({ message: "login not implemented yet" });
});

export default router;
