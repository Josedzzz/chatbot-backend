import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Handles the bussiness logic for creating a user
 * @param userData the userData to be saved in the database
 * @returns a promise to the created userObject
 */
export const singUpService = async (userData: IUser): Promise<IUser> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const user = new User({ ...userData, password: hashedPassword });
  return await user.save();
}

/**
 * Handles the logic for log in a user and generating the JWT
 * @param email the email to find the user
 * @param password the password provided by the user
 * @returns a promise to the created JWT token
 */
export const loginService = async (email: string, password: string): Promise<{ token: string, user: IUser }> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "8h" }
  );
  return { token, user };
}
