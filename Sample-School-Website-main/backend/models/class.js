import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    // Class identifier
    name: {
      type: String,
      required: true,
      // Example: "Class 5A", "Class 6B"
      unique: true,
    },

    // Grade level
    grade: {
      type: Number,
      required: true,
      // Example: 5, 6, 7, 8
    },

    // Section
    section: {
      type: String,
      required: true,
      // Example: "A", "B", "C"
    },

    // Class teacher (reference to Teacher model)
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    // List of students in this class
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // Maximum capacity
    maxCapacity: {
      type: Number,
      default: 50,
    },

    // Academic year
    academicYear: {
      type: String,
      required: true,
      // Example: "2024-2025"
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
classSchema.index({ name: 1 });
classSchema.index({ grade: 1, section: 1 });

const Class = mongoose.model("Class", classSchema);

export default Class;
