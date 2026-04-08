import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // Student Information
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    grade: {
      type: String,
      required: true,
      enum: ["nursery", "lkg", "ukg", "1st", "2nd", "3rd", "4th", "5th"],
    },
    previousSchool: {
      type: String,
      trim: true,
      default: "",
    },
    medicalInfo: {
      type: String,
      trim: true,
      default: "",
    },

    // Application Status
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending",
    },

    // Generated User ID (reference to the created parent account)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // Admin Notes
    adminNotes: {
      type: String,
      default: "",
    },

    // Review Date
    reviewedAt: {
      type: Date,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;