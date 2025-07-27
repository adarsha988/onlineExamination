import { body } from "express-validator";

export const validateSubmission = [
  body("student").notEmpty().isMongoId().withMessage("Valid student ID required."),
  body("exam").notEmpty().isMongoId().withMessage("Valid exam ID required."),
  body("answers").isArray({ min: 1 }).withMessage("Answers must be a non-empty array."),
  body("answers.*.questionId").notEmpty().isMongoId().withMessage("Valid question ID required."),
  body("answers.*.answer").notEmpty().withMessage("Answer is required."),
];
