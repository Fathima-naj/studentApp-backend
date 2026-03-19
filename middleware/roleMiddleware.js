import asyncHandler from "../utils/asyncHandler.js";

const roleMiddleware = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {

    if (!req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error("Access denied. Insufficient permission");
      error.statusCode = 403;
      throw error;
    }

    next();

  });
};

export default roleMiddleware;