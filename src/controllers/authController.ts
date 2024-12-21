import { Request, Response } from "express";
import { loginService, singUpService } from "../services/authService";
import { errorResponse, successResponse } from "../utils/response";

/**
 * Handles user singup request
 * @param req the http request object
 * @param res the http response object
 */
export const singUpController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await singUpService(req.body);
    res.status(201).json(successResponse(user, "User created successfully"));
  } catch (error: any) {
    res
      .status(400)
      .json(
        errorResponse(
          error.error?.code || "SIGNUP_ERROR",
          error.error?.message || "Signup failed",
        ),
      );
  }
};

/**
 * Handles the login request
 * @param req the http request object
 * @param res the http response object
 */
export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginService(email, password);
    res.status(200).json(successResponse({ token, user }, "Login successful"));
  } catch (error: any) {
    res
      .status(400)
      .json(
        errorResponse(
          error.error?.code || "LOGIN_ERROR",
          error.error?.message || "Login failed",
        ),
      );
  }
};
