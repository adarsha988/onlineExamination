import express from "express";
import { isUser} from "../authentication/user.authentication.js";
import { hasRoles } from "../authentication/student.authentication.js";
import { validateSubmission } from "./studentSubmission.validation.js";
import {
  submitExamHandler,
  getExamSubmissionsHandler,
  getStudentSubmissionsHandler,
  updateSubmissionHandler,
  evaluateSubmissionHandler,
  evaluateAllSubmissionsHandler,
} from "./studentSubmission.service.js";

const router = express.Router();

router.post("/exam", isUser, hasRoles("student"),validateSubmission,submitExamHandler);
router.get("/:examId", isUser, hasRoles(["admin", "instructor"]), getExamSubmissionsHandler);
router.get("/student/:studentId", isUser, hasRoles(["admin", "instructor"]), getStudentSubmissionsHandler);
router.patch("/:id", isUser, hasRoles("student"), updateSubmissionHandler); // for timeout or review
router.patch("/:id/evaluate", isUser, hasRoles(["admin", "instructor"]), evaluateSubmissionHandler);
router.patch("/:examId/evaluate-all", isUser, hasRoles(["admin", "instructor"]), evaluateAllSubmissionsHandler);

export default router;