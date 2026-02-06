import express from "express";
import {
  getMe,
  updateBodyStats,
  addConsumedCalories,
  addExerciseCalories,
  deleteConsumedCalories,
  deleteExerciseCalories,
} from "../controllers/bodyStats.controller.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

// GET /api/users/me
router.get("/me", protect, getMe);

// PUT /api/users/update
router.put("/update", protect, updateBodyStats);

//Consumed Calrories
router.post("/consumed-calories", protect, addConsumedCalories);
router.delete(
  "/consumed-calories/:consumedId",
  protect,
  deleteConsumedCalories,
);

//Exercise Calories
router.post("/exercise-calories", protect, addExerciseCalories);
router.delete(
  "/exercise-calories/:exerciseId",
  protect,
  deleteExerciseCalories,
);
export default router;
