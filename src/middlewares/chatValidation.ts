import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";

/**
 * Middleware to validate JWT token
 */
export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json(errorResponse("JWT_SECRET", "You need a JWT token"));
    return;
  }
  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res
      .status(401)
      .json(
        errorResponse(
          "JWT_ERROR",
          "Your session has expired, please login again",
        ),
      );
  }
};
