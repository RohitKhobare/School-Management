import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic user information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    // User role: admin, teacher, student, or parent
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher", "admin", "parent"],
      default: "student",
    },

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;