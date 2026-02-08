import User from "../models/User.js";
import { rollOverIfNewDay } from "../utils/rollover.js";

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
    await rollOverIfNewDay(user);
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addConsumedCalories = async (req, res) => {
  try {
    const { consumedId, name, total } = req.body;

    if (!consumedId || !name || total === null) {
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

    if (!exerciseId || !exerciseName || totalExercise === null) {
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

const isoDay = (d = new Date()) => d.toISOString().split("T")[0];

const yesterdayIso = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return isoDay(d);
};

export const getCaloriesSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.bodyStats) {
      return res
        .status(404)
        .json({ message: "User not found / bodyStats missing" });
    }

    const today = "2026-02-08";
    const yday = "2026-02-07";

    const lastResetIso = user.lastResetDate ? isoDay(user.lastResetDate) : null;

    if (lastResetIso !== today) {
      const consumedTotalYesterday = (user.consumedCalories || []).reduce(
        (sum, item) => sum + Number(item.total || 0),
        0,
      );

      // prevent duplicates for yesterday
      const existing = (user.totalConsumedCalories || []).find(
        (d) => d.date === yday,
      );
      if (existing) {
        existing.consumedTotal = consumedTotalYesterday;
      } else {
        user.totalConsumedCalories.push({
          date: yday,
          consumedTotal: consumedTotalYesterday,
        });
      }

      // reset daily arrays
      user.consumedCalories = [];
      user.amountOfExercise = [];

      user.lastResetDate = new Date();

      await user.save();
    }

    const { weight, height, age, totalExercise, gender } = user.bodyStats;

    const bmr =
      weight * 10 + 6.25 * height - 5 * age + (gender === "female" ? -161 : 5);

    const activityMultiplier =
      totalExercise === "veryLittle"
        ? 1.2
        : totalExercise === "light"
          ? 1.375
          : totalExercise === "moderate"
            ? 1.55
            : totalExercise === "active"
              ? 1.725
              : 1.2;

    const targetCalories = Math.round(bmr * activityMultiplier - 300);

    const consumedCalories = (user.consumedCalories || []).reduce(
      (sum, item) => sum + Number(item.total || 0),
      0,
    );

    const exerciseCalories = (user.amountOfExercise || []).reduce(
      (sum, item) => sum + Number(item.totalExercise || 0),
      0,
    );

    const remainingCalories =
      targetCalories - consumedCalories + exerciseCalories;

    return res.status(200).json({
      date: today,
      targetCalories,
      consumedCalories,
      exerciseCalories,
      remainingCalories,
      history: user.totalConsumedCalories || [],
    });
  } catch (error) {
    console.error("Get calories summary error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
