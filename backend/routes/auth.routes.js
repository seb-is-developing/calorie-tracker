import express from "express";
import {
  register,
  login,
  getAllUsers,
} from "../controllers/auth.controller.js";
console.log("Loading auth routes...");

const router = express.Router();

//GET /api/auth/getusers
router.get("/getusers", getAllUsers);

// POST /api/auth/register
router.post("/register", register);
// POST /api/auth/login
router.post("/login", login);

export default router;
