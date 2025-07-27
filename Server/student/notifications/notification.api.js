import express from "express";
import { validationResult } from "express-validator";
import {
  isAdmin,
  isInstructor,
  isStudent,
  isUser,
} from "../../authentication/user.authentication.js";
import {
  getNotifications,
  getNotificationsForUser,
  markNotificationAsRead,
  sendNotification,
  deleteAllNotifications,
  deleteNotificationById,
} from "./notification.service.js";
import {
  validateNotification,
  validateNotificationId,
} from "./notification.validation.js";
import { allowRoles } from "../../authentication/notification.authentication.js";

const router = express.Router();

// Middleware to check validation errors
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Send a notification (typically by instructor)
router.post(
  "/instructor/notifications",
  isUser,
  isInstructor,
  validateNotification,
  checkValidation,
  sendNotification
);

//list all notifications for all Users
router.get(
  "/admin/notifications_all",
  isUser,
  isAdmin,
  getNotificationsForUser
);

router.post("/notifications_admin", isUser, isAdmin, sendNotification);

// Get notifications for a student
router.get("/student/notifications", isUser, isStudent, getNotifications);

// Mark notification as read
router.patch(
  "/student/notifications/:id/isVerified",
  isUser,
  validateNotificationId,
  checkValidation,
  markNotificationAsRead
);
router.delete(
  "/notifications",
  isUser,
  allowRoles("Instructor", "Admin"),
  deleteAllNotifications
);
router.delete(
  "/notifications/:id",
  isUser,
  deleteNotificationById
);

export default router;
