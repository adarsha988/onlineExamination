import express from "express";
import {
  getProfile,
  updateProfile,
  getCourses,
  getExamsForCourse,
  startExam,
  getExamQuestions,
  submitExam,
  getExamResult,
  getExamHistory,
  getNotifications,
  logoutStudent,
} from "./student.services.js";

import { isUser } from "../authentication/user.authentication.js";
import {  hasRole } from "../authentication/student.authentication.js";

const router = express.Router();

// Protect all routes, only allow students
router.use(isUser, hasRole("student"));

// GET /student/profile
router.get("/profile", getProfile);

// PUT /student/profile (if you want to allow updates)
router.put("/profile", updateProfile);

// GET /student/courses
router.get("/courses", getCourses);

// GET /student/courses/:courseId/exams
router.get("/courses/:courseId/exams", getExamsForCourse);

// POST /student/exams/:examId/start
router.post("/exams/:examId/start", startExam);

// GET /student/exams/:examId/questions
router.get("/exams/:examId/questions", getExamQuestions);

// POST /student/exams/:examId/submit
router.post("/exams/:examId/submit", submitExam);

// GET /student/exams/:examId/result
router.get("/exams/:examId/result", getExamResult);

// GET /student/exams/history
router.get("/exams/history", getExamHistory);

// GET /student/notifications
router.get("/notifications", getNotifications);

// POST /student/logout
router.post("/logout", logoutStudent);

export default router;
