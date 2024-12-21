import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { errorResponse } from "../utils/response";
import User from "../models/User";

/**
 * Middleware to validate the signup data form
 */
export const validateSignup = [
  check("email")
    .isEmail()
    .withMessage("Invalid email format")
    .bail()
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email is already in use");
      }
    }),

  check("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .bail()
    .custom(async (username) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username is already in use");
      }
    }),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json(errorResponse("VALIDATION_ERROR", errors.array()[0].msg));
      return;
    }
    next();
  },
];

/**
 * Middleware to validate login data.
 */
export const validateLogin = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json(errorResponse("VALIDATION_ERROR", errors.array()[0].msg));
      return;
    }
    next();
  },
];
