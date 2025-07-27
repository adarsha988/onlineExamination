// student/student.validation.js
import { body, param } from "express-validator";

export const validateNotification = [
  body("title").notEmpty().withMessage("Title is required").isLength({ max: 100 }),
  body("message").notEmpty().withMessage("Message is required"),
];

export const validateNotificationId = [
  param("id").isMongoId().withMessage("Invalid notification ID")
];
