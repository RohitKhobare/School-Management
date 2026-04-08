import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["academic", "financial", "attendance", "performance", "administrative"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    filters: {
      class: String,
      section: String,
      dateFrom: Date,
      dateTo: Date,
      academicYear: String,
    },
    status: {
      type: String,
      enum: ["generating", "completed", "failed"],
      default: "completed",
    },
    fileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;