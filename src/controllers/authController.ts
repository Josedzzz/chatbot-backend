import { Request, Response } from "express";
import { loginService, singUpService } from "../services/authService";

/**
 * Handles user singup request
 * @param req the http request object
 * @param res the http response object
 */
export const singUpController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await singUpService(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Handles the login request
 * @param req the http request object
 * @param res the http response object
 */
export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginService(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
