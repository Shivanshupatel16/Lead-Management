import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    source: { type: String, default: "Website" },
    notes: { type: String },
    status: { type: String, enum: ["new", "in-progress", "converted", "lost"], default: "new" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const Lead = mongoose.model("Lead", leadSchema);
