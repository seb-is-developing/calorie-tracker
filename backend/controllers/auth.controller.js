import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, userName } = req.body;

    // 1. Basic validation
    if (!email || !password || !firstName) {
      return res.status(400).json({
        message: "Email, password, and first name are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Create user (password is hashed by model hook)
    const user = await User.create({
      userName,
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
    });

    // 4. Create JWT
    const token = signToken({ id: user._id });

    // 5. Respond
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    // 2. Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid email " });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Create JWT
    const token = signToken({ id: user._id });

    // 4. Respond
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
