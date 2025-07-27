import express from "express";
import { listUser, loginDataValidation, loginUser, signupUser, validateUser } from "./user.service.js";
import { isUser } from "../authentication/user.authentication.js";
const router = express.Router();

router.post("/user/signup",validateUser,signupUser);
router.post("/user/login",loginDataValidation,loginUser);
router.get("/user/list", isUser, listUser);

export default router;
