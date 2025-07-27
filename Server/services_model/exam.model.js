import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  duration: Number, // in minutes
  totalMarks: Number,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  startDate: Date,
  endDate: Date,
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);
