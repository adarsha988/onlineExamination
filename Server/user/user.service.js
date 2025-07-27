import User from "./user.model.js";
import validator from "validator";
import {
  validateUserLoginData,
  validateUserSignupData,
} from "./user.validation.js";
import bcrypt from "bcrypt";
import { generateJWT, verifyJWT } from "../utils/jwt.js";
import Student from "../student/student.model.js";
import { use } from "react";

export const validateUser = async (req, res, next) => {
  const userData = req.body;
  try {
    await validateUserSignupData.validate(userData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export const signupUser = async (req, res) => {
  const userData = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }
      
    // Validate email
    if (!validator.isEmail(userData.email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Optional: Validate password strength
    if (userData.password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(userData.password, 10);

    // Create new user with hashed password
    const newUser = {
      ...userData,
      password: hashPassword,
    };

    const response = await User.create(newUser);

    if (userData?.role === "student"||userData?.role === "") {
  await Student.create();
}
    const { password, ...userInfo } = response.toObject();

    return res.status(201).json({ message: "Account created.", user: userInfo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login functions

export const loginDataValidation = async (req, res, next) => {
  const userData = req.body;
  try {
  
    await validateUserLoginData.validate(userData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

// Login Controller
export const loginUser = async (req, res) => {
  const userData = req.body; // Get login data from request body

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email: userData.email });

    // 2. If user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Compare entered password with hashed password stored in DB
    const isMatch = await bcrypt.compare(userData.password, user.password);

    // 4. If passwords don't match, return an error
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 5. Create payload for JWT token (avoid including sensitive info)
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role, // useful for role-based access
    };

    // 6. Generate JWT token
    const token = await generateJWT(payload);

    // 7. Convert Mongoose document to plain JS object
    const userObj = user.toObject();

    // 8. Remove password field before sending to client
    delete userObj.password;

    // 9. Send response with user info and token
    return res.status(200).json({
      message: "Login successful",
      user: userObj,
      token,
    });

  } catch (error) {
    // 10. Catch any unexpected errors and respond with 500
    return res.status(500).json({ message: error.message });
  }
};

export const listUser = async(req,res)=>{
  try{
    const result= await User.find();
   if(result){
    return res.status(200).json({data:result,message:"success"})
   }
  }
  catch(err){
    return res.status(400).json({data:"",message:"something went wrong"})
  }

}