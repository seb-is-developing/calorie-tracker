import User from "../models/User.js";

export const updateBodyStats = async (req, res) => {
  try {
    const { age, height, weight, gender, totalExercise } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        bodyStats: {
          age,
          height,
          weight,
          gender,
          totalExercise,
        },
      },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Body stats updated successfully",
      bodyStats: updatedUser.bodyStats,
    });
  } catch (error) {
    console.error("Update body stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
