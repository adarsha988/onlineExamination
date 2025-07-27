import mongoose from "mongoose";

const examAttemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      answer: mongoose.Schema.Types.Mixed, // can be string, array, etc.
      marksObtained: Number,
    }
  ],
  status: { type: String, enum: ["in-progress", "submitted", "graded"], default: "in-progress" },
  startedAt: Date,
  submittedAt: Date,
  gradedAt: Date,
  totalMarksObtained: Number,
}, { timestamps: true });

export default mongoose.model("ExamAttempt", examAttemptSchema);
