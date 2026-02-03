import express from "express";
import { updateBodyStats } from "../controllers/bodyStats.controller.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.put("/update", protect, updateBodyStats);

export default router;
