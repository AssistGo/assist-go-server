import { Request, Response } from "express";
import { v4 } from "uuid";

const getAllMessagesFromConversation = async (req: Request, res: Response) => {
  const senderId = v4();
  const receiverId = v4();

  return res.status(200).json({
    messages: [
      {
        id: v4(),
        index: 0,
        text: "Message 0",
        sender: {
          id: senderId,
          fullName: "Daniel Nofulla",
          fullPhoneNumber: "+11234567890",
        },
        receiver: {
          id: receiverId,
          fullName: "Dolunay Dagci",
          fullPhoneNumber: "+11234567893",
        },
        sentAt: new Date(),
      },
      {
        id: v4(),
        index: 1,
        text: "Message 1",
        sender: {
          id: senderId,
          fullName: "Daniel Nofulla",
          fullPhoneNumber: "+11234567890",
        },
        receiver: {
          id: receiverId,
          fullName: "Dolunay Dagci",
          fullPhoneNumber: "+11234567893",
        },
        sentAt: new Date(),
      },
      {
        id: v4(),
        index: 2,
        text: "Message 2",
        sender: {
          id: receiverId,
          fullName: "Dolunay Dagci",
          fullPhoneNumber: "+11234567893",
        },
        receiver: {
          id: senderId,
          fullName: "Daniel Nofulla",
          fullPhoneNumber: "+11234567890",
        },
        sentAt: new Date(),
      },
      {
        id: v4(),
        index: 3,
        text: "Message 3",
        sender: {
          id: receiverId,
          fullName: "Dolunay Dagci",
          fullPhoneNumber: "+11234567893",
        },
        receiver: {
          id: senderId,
          fullName: "Daniel Nofulla",
          fullPhoneNumber: "+11234567890",
        },
        sentAt: new Date(),
      },
      {
        id: v4(),
        index: 4,
        text: "Message 4",
        sender: {
          id: senderId,
          fullName: "Daniel Nofulla",
          fullPhoneNumber: "+11234567890",
        },
        receiver: {
          id: receiverId,
          fullName: "Dolunay Dagci",
          fullPhoneNumber: "+11234567893",
        },
        sentAt: new Date(),
      },
      {
        id: v4(),
        index: 5,
        text: "Message 5",
        sender: {
          id: receiverId,
          fullName: "Dolunay Dagci",
          fullPhoneNumber: "+11234567893",
        },
        receiver: {
          id: senderId,
          fullName: "Daniel Nofulla",
          fullPhoneNumber: "+11234567890",
        },
        sentAt: new Date(),
      },
    ],
  });
};

module.exports = { getAllMessagesFromConversation };
export { getAllMessagesFromConversation };
