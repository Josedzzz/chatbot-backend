import { Request, Response } from "express";
import { chatService, clearHistory, getChatHistory } from "../services/chatService";

/**
 * Controller to handle chat interactions
 * @param req The request object
 * @param res The response object
 */
export const chatController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Missing prompt field" });
      return;
    }
    const response = await chatService(prompt, userId);
    res.status(200).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ error: `Chat interaction failed: ${error.message}` });
  }
};

/**
 * Controller to handle chat history retrieval
 * @param req The request object
 * @param res The response object
 */
export const chatHistoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ error: "Missing userId parameter" });
      return;
    }
    const chatHistory = await getChatHistory(userId);
    res.status(200).json({ chatHistory });
  } catch (error: any) {
    res.status(500).json({ error: `Failed to retrieve chat history: ${error.message}` });
  }
};

/**
 * Controller to clear the user's chat history
 * @param req The request object
 * @param res The response object
 */
export const clearHistoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ error: "Missing userId parameter" });
      return;
    }

    // Call the service to clear the user's chat history
    await clearHistory(userId);

    // Respond with a success message
    res.status(200).json({ message: "User chat history cleared successfully" });
  } catch (error: any) {
    res.status(500).json({ error: `Failed to clear chat history: ${error.message}` });
  }
};
