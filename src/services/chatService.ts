import OpenAI from "openai";

/**
 * Handles the logic for interacting with the OpenAI API
 * @param prompt The user input to send to the model
 * @returns a promise containing the model's response
 */
export const chatService = async (prompt: string): Promise<string> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  });
  return completion.choices[0].message?.content || "No response from the model.";
};
