import express from "express";
import { register, login } from "../controllers/auth.controller.js";
console.log("Loading auth routes...");

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

export default router;
