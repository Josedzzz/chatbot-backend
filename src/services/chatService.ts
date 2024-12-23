import { model } from "../config/gemini";
import User, { IUser } from "../models/User";
import Chat, { IChat } from "../models/Chat";
import { errorResponse } from "../utils/response";

/**
 * Retrieves the chat history of a user, creating a new chat if none exists
 * @param userId The ID of the user
 * @returns A promise containing the user's chat history
 */
export const getChatHistory = async (userId: string): Promise<IChat> => {
  try {
    const user = await findUser(userId);
    let userChat: IChat | null = null;
    if (user.chat) {
      // Retrieve the existing chat
      userChat = await Chat.findById(user.chat).exec();
    }
    if (!userChat) {
      // Create a new chat if none exists
      userChat = new Chat({
        userId: user._id,
        title: `${user.username}'s chat`,
        messages: [],
      });
      await userChat.save();
      // Link the new chat to the user
      user.chat = userChat.id;
      await user.save();
    }
    return userChat;
  } catch (error: any) {
    throw new Error(`Error retrieving chat history: ${error.message}`);
  }
};

/**
 * Handles the logic for interacting with the Gemini API
 * @param prompt The user input to send to the model
 * @param userId The ID of the user making the request
 * @returns A promise containing the model's response
 */
export const chatService = async (
  prompt: string,
  userId: string,
): Promise<string> => {
  try {
    const user = await findUser(userId);
    let userChat: IChat | null = null;
    if (user.chat) {
      // Retrieve the existing chat
      userChat = await Chat.findById(user.chat).exec();
    }
    if (!userChat) {
      // Create a new chat if none exists
      userChat = new Chat({
        userId: user._id,
        title: `${user.username}'s chat`,
        messages: [],
      });
      await userChat.save();
      // Link the new chat to the user
      user.chat = userChat.id;
      await user.save();
    }
    // Initialize Gemini chat
    const chat = model.startChat({
      history: userChat
        ? userChat.messages.map((msg) => ({
            role: msg.sender === "user" ? "user" : "model", // Map user to 'user' role and bot to 'model'
            parts: [{ text: msg.message }], // Wrap the message in 'parts' with a 'text' field
          }))
        : [], // If no chat exists, start with an empty history
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    // Send the message to Gemini
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const botMessage = response.text();
    // Update the chat with the new messages
    userChat.messages.push(
      { sender: "user", message: prompt, timestamp: new Date() },
      { sender: "bot", message: botMessage, timestamp: new Date() },
    );
    await userChat.save();
    return botMessage;
  } catch (error: any) {
    throw new Error(`Gemini API error: ${error.message}`);
  }
};

/**
 * Clears the chat history of a user
 * @param userId The ID of the user whose chat history is to be cleared
 * @returns A promise indicating the operation is complete
 */
export const clearHistory = async (userId: string): Promise<void> => {
  try {
    const user = await findUser(userId);
    if (!user.chat) {
      throw new Error("No chat found for the user.");
    }
    const userChat = await Chat.findById(user.chat).exec();
    if (!userChat) {
      throw errorResponse("CHAT_NOT_FOUND", "Chat not found.");
    }
    // Clear the messages
    userChat.messages = [];
    await userChat.save();
  } catch (error: any) {
    throw new Error(`Error clearing chat history: ${error.message}`);
  }
};

/**
 * Finds a user by ID
 * @param userId The ID of the user to find
 * @returns A promise containing the user
 */
const findUser = async (userId: string): Promise<IUser> => {
  try {
    const user = await User.findById(userId).exec();
    if (!user)
      throw errorResponse("USER_NOT_REGISTERED", "User not registered");
    return user;
  } catch (error: any) {
    throw new Error(`UserId error: ${error.message}`);
  }
};
