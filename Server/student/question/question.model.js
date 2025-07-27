import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [
    {
      type: String,
      required: true
    }
  ],
  correctAnswer: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    default: 1
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  }
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
