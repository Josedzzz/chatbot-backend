import { Request, Response } from "express";
import { chatService } from "../services/chatService";

/**
 * Handles chat requests
 * @param req the http request object
 * @param res the http response object
 */
export const chatController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }
    const response = await chatService(prompt);
    res.status(200).json({ message: "Response generated successfully", response });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
