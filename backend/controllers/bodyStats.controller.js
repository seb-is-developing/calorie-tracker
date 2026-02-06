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

export const addConsumedCalories = async (req, res) => {
  try {
    const { consumedId, name, total } = req.body;

    if (!consumedId || !name || !total) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.consumedCalories.push({
      consumedId,
      dateTime: new Date(),
      name,
      total,
    });
    await user.save();
    res.status(201).json({
      message: "Consumed calories added successfully",
      consumedCalories: user.consumedCalories,
    });
  } catch (error) {
    console.error("Add consumed calories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteConsumedCalories = async (req, res) => {
  try {
    const { consumedId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const before = user.consumedCalories.length;
    user.consumedCalories = user.consumedCalories.filter(
      (item) => item.consumedId !== consumedId,
    );

    if (user.consumedCalories.length === before) {
      return res.status(404).json({ message: "Consumed calorie not found" });
    }

    await user.save();
    res.status(200).json({
      message: "Consumed calories deleted successfully",
      consumedCalories: user.consumedCalories,
    });
  } catch (error) {
    console.error("Delete consumed calories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addExerciseCalories = async (req, res) => {
  try {
    const { exerciseId, exerciseName, totalExercise } = req.body;

    if (!exerciseId || !exerciseName || !totalExercise) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.amountOfExercise.push({
      exerciseId,
      dateExercise: new Date(),
      exerciseName,
      totalExercise,
    });

    await user.save();
    res.status(201).json({
      message: "Exercise calories added successfully",
      amountOfExercise: user.amountOfExercise,
    });
  } catch (error) {
    console.error("Add exercise calories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExerciseCalories = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const before = user.amountOfExercise.length;
    user.amountOfExercise = user.amountOfExercise.filter(
      (item) => item.exerciseId !== exerciseId,
    );
    if (user.amountOfExercise.length === before) {
      return res.status(404).json({ message: "Exercise calorie not found" });
    }

    await user.save();
    res.status(200).json({
      message: "Exercise calories deleted successfully",
      amountOfExercise: user.amountOfExercise,
    });
  } catch (error) {
    console.error("Delete exercise calories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
