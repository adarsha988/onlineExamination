export const hasRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.userData || !allowedRoles.includes(req.userData.role)) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};
