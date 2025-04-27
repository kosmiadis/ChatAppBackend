import { Model, model, Schema } from "mongoose";
import { isEmpty } from "validator";

export interface MessageI {
    senderId: string,
    receiverId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

interface MessageMethods {
    edit: () => Promise<boolean>
}

type MessageModel = Model<MessageI, {}, MessageMethods>

const MessageSchema = new Schema<MessageI, MessageModel, MessageMethods>({
   receiverId: { type: String, required: true },
   senderId: { type: String, required: true },
   content: { type: String, required: true }
}, { timestamps: true} )


const Message = model('Message', MessageSchema);
export default Message;