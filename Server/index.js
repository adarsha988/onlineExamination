import cors from "cors";
import express from "express";
import { connectDb } from "./dbConnect.js";
import notificationRouter from "./student/notifications/notification.api.js";
import userRouter from "./user/user.api.js";
import SubmissionRouter from "./student/Subbmission/studentSubmission.api.js";
import studentModel from "./student/student.model.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.use(userRouter);
app.use(notificationRouter);
app.use(SubmissionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
