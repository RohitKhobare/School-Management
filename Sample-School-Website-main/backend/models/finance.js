import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["fee_payment", "fine", "refund", "scholarship", "transport", "books", "uniform"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank_transfer", "cheque"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "completed",
    },
    dueDate: {
      type: Date,
    },
    paidDate: {
      type: Date,
      default: Date.now,
    },
    academicYear: {
      type: String,
      required: true,
    },
    receiptNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Finance = mongoose.model("Finance", financeSchema);
export default Finance;