import Student from "./student.model.js";
import Exam from "../exam/exam.model.js"; // Assume you have exam model
import ExamAttempt from "../exam/examAttempt.model.js"; // For exam attempts

// Get profile
export const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.userData?.id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const student = await Student.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get courses student is enrolled in
export const getCourses = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate("enrolledCourses");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get exams for a course
export const getExamsForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const exams = await Exam.find({ course: courseId });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Start exam - create an attempt
export const startExam = async (req, res) => {
  try {
    const { examId } = req.params;
    // Create exam attempt logic (simplified)
    const attempt = await ExamAttempt.create({
      student: req.user.id,
      exam: examId,
      startedAt: new Date(),
      answers: [],
      status: "in-progress",
    });
    res.json({ attemptId: attempt._id, message: "Exam started" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get exam questions
export const getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId).populate("questions");
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json(exam.questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit exam answers
export const submitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers } = req.body;

    const attempt = await ExamAttempt.findOne({
      student: req.user.id,
      exam: examId,
      status: "in-progress",
    });

    if (!attempt) return res.status(400).json({ message: "No active attempt found" });

    attempt.answers = answers;
    attempt.status = "submitted";
    attempt.submittedAt = new Date();

    // TODO: add grading logic here

    await attempt.save();

    res.json({ message: "Exam submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get exam result
export const getExamResult = async (req, res) => {
  try {
    const { examId } = req.params;
    const attempt = await ExamAttempt.findOne({
      student: req.user.id,
      exam: examId,
      status: "submitted",
    }).populate("exam");

    if (!attempt) return res.status(404).json({ message: "Result not found" });

    // You can include detailed grading info here
    res.json(attempt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Exam history
export const getExamHistory = async (req, res) => {
  try {
    const attempts = await ExamAttempt.find({ student: req.user.id }).populate("exam");
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get notifications (stub)
export const getNotifications = async (req, res) => {
  // Implement your notification logic
  res.json([{ id: 1, message: "New exam available" }]);
};

// Logout (if managing sessions or token blacklist)
export const logoutStudent = async (req, res) => {
  // For stateless JWT, client just discards token
  res.json({ message: "Logged out successfully" });
};
