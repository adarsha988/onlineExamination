import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true }, // or index of correct option
  marks: { type: Number, default: 1 },
  type: { type: String, enum: ["mcq", "descriptive"], default: "mcq" }
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);

