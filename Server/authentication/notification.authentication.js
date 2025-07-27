export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.userData?.role)) return next();
    return res.status(403).json({ message: "Access denied." });
  };
};