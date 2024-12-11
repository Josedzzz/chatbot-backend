import mongoose, { Document, Schema } from "mongoose";

export interface IMessage {
  sender: "user" | "bot";
  message: string;
  timestamp: Date;
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  messages: IMessage[];
}

const messageSchema = new Schema<IMessage>({
  sender: { type: String, enum: ["user", "bot"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema<IChat>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  messages: [messageSchema],
});

export default mongoose.model<IChat>("Chat", chatSchema);

