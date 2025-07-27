import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    classLevel: {
      type: String,
      required: true,
    },
    // Exam Analytics
    examsCompleted: {
      type: Number,
      default: 0,
    },

    averageScore: {
      type: Number,
      default: 0,
    },

    recentExamResult: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamResult",
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
