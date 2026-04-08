import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/errorHandler.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return errorResponse(res, 401, "No token provided. Please login first.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, 401, "Token has expired. Please login again.");
    }
    if (error.name === "JsonWebTokenError") {
      return errorResponse(res, 401, "Invalid token. Please login again.");
    }
    return errorResponse(res, 500, "Token verification failed.");
  }
};

export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return errorResponse(
          res,
          401,
          "User not authenticated. Please login first."
        );
      }

      if (!allowedRoles.includes(req.user.role)) {
        return errorResponse(
          res,
          403,
          `Access denied. Only ${allowedRoles.join(", ")} can access this resource.`
        );
      }

      next();
    } catch (error) {
      return errorResponse(res, 500, "Authorization check failed.");
    }
  };
};
