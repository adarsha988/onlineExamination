// controllers/submission.controller.js
import asyncHandler from "express-async-handler";
import {
  submitExam,
  getExamSubmissions,
  getStudentSubmissions,
  updateSubmission,
  evaluateSubmission,
  evaluateAllSubmissions,
} from "../services/submission.service.js";

export const submitExamHandler = asyncHandler(async (req, res) => {
  const data = await submitExam(req.userId, req.body);
  res.status(201).json(data);
});

export const getExamSubmissionsHandler = asyncHandler(async (req, res) => {
  const submissions = await getExamSubmissions(req.params.examId);
  res.status(200).json(submissions);
});

export const getStudentSubmissionsHandler = asyncHandler(async (req, res) => {
  const submissions = await getStudentSubmissions(req.params.studentId);
  res.status(200).json(submissions);
});

export const updateSubmissionHandler = asyncHandler(async (req, res) => {
  const updated = await updateSubmission(req.params.id, req.body);
  res.status(200).json(updated);
});

export const evaluateSubmissionHandler = asyncHandler(async (req, res) => {
  const result = await evaluateSubmission(req.params.id);
  res.status(200).json(result);
});

export const evaluateAllSubmissionsHandler = asyncHandler(async (req, res) => {
  const result = await evaluateAllSubmissions(req.params.examId);
  res.status(200).json(result);
});
