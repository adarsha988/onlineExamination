// student/student.service.js

import { Notification } from "./notification.model.js";

// Admin creates a notification
export const sendNotification = async (req, res) => {
  try {
    const { title, message, userId = null } = req.body; // null means broadcast
    const notification = new Notification({
  title: title||"Midterm Exams Announced",
  message:message||"All students must attend.",
  userId: userId, // sent to all
  createdBy: req.userId // admin who sent it
});

 console.log("Notification data:", notification);  
    await notification.save();
    res.status(201).json({ message: "Notification sent successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all notifications for a student
export const getNotifications = async (req, res) => {
  try {
const notifications = await Notification.find({
  $or: [
    { userId: req.userId }, // personalized
    { userId: null }        // broadcast to all
  ]
}).sort({ createdAt: -1 });  
  res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isVerified: true });
    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNotificationsForUser = async (req, res) => {

  if (req.userData.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only." });
  }

  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteAllNotifications = async (req, res) => {
  if (req.userData.role !== "Instructor"&& req.userData.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Instructors or Admin Only." });
  }

  try {
    await Notification.deleteMany(); // delete all broadcast notifications
    res.status(200).json({ message: "All notifications deleted." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export const deleteNotificationById = async (req, res) => { 

  if (req.userData.role !== "Instructor" && req.userData.role !== "Admin"&& req.userData.role !== "Student") {
    return res.status(403).json({ message: "Access denied: Instructors or Admin Only." });
  }

  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }
    res.status(200).json({ message: "Notification deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}