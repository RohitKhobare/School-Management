import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["school", "academic", "finance", "notification", "security"],
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    description: {
      type: String,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Compound index for category and key
settingsSchema.index({ category: 1, key: 1 }, { unique: true });

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;