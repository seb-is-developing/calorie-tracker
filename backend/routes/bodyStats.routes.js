import express from "express";
import { getMe, updateBodyStats } from "../controllers/bodyStats.controller.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

// GET /api/users/me
router.get("/me", protect, getMe);

// PUT /api/users/update
router.put("/update", protect, updateBodyStats);

export default router;
