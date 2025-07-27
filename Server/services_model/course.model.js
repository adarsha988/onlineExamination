import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  // Add other fields as needed
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
