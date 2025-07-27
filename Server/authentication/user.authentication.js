import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
export const isUser = async (req, res, next) => {
  const userToken = req.headers.authorization;
  console.log(userToken)
  //check token is available or not
  if (!userToken) {
    return res.status(404).json({ message: "User token not found. " });
  }

  //split token
  const splitToken = userToken.split(" ");

  const token = splitToken[1];

  if (!token) {
    return res.status(400).json({ message: "User token not found. " });
  }

  //decrypt token and find email

  let payload;
  try {
    payload = jwt.verify(token, process.env.key);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }

  //check user existance for login as a user

  const user = await User.findOne({ email: payload.data.email });

  if (!user) {
    return res.status(400).json({ message: "Unauthorized " });
  }

  user.password = undefined;
  user.device = undefined;

  req.userId = user._id;
  req.userData = user;
  next();
};
export const isStudent = (req, res, next) => {
  console.log("User role:", req.userData?.role);
  if (req.userData?.role !== "Student") {
    return res.status(403).json({ message: "Access denied: Students only." });
  }
  next();
};

export const isInstructor = (req, res, next) => {
  if (req.userData?.role !== "Instructor") {
    return res
      .status(403)
      .json({ message: "Access denied: Instructors only." });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  // Check if the user is an admin
  if (req.userData?.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only." });
  }
  next();
};
