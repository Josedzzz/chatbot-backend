import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  chat: mongoose.Types.ObjectId;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chat: { type: Schema.Types.ObjectId, ref: "Chat" },
});

export default mongoose.model<IUser>("User", userSchema);
