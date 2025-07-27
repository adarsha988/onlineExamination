import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null // <== means it's for everyone
  },
  isVerified: { type: Boolean, default: false }, // <== for admin verification
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true // <== always admin ID
  },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model("Notification", notificationSchema);

