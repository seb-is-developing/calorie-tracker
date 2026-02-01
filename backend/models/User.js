import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 16,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },

    phone: {
      type: String,
      maxlength: 15,
    },

    bodyStats: {
      age: { type: Number, min: 10, max: 120 },
      height: { type: Number, min: 100, max: 250 }, // cm
      weight: { type: Number, min: 30, max: 300 },  // kg
      totalExercise: { type: String },
    },

    userCalories: {
      type: Number,
    },

    consumedCalories: [
      {
        consumedId: { type: String },
        dateTime: { type: Date },
        name: { type: String },
        total: { type: Number },
      },
    ],

    amountOfExercise: [
      {
        exerciseId: { type: String },
        dateExercise: { type: Date },
        exerciseName: { type: String },
        totalExercise: { type: Number },
      },
    ],

    totalConsumedCalories: [
      {
        date: { type: String },
        consumedTotal: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
