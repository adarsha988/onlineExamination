import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  totalMarks: {
    type: Number,
    required: true
  },
  durationMinutes: {
    type: Number,
    required: true
  },
  subject: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startTime: Date,
  endTime: Date,
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);
