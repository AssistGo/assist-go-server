import { Request, Response } from "express";
import Axios from "axios";
import UserModel from "../models/User.model";
import Message from "../models/Message.model";
// import codes, { by639_1, by639_2T, by639_2B } from "iso-language-codes";

class MessageService {
  public actions;

  constructor() {
    this.actions = this.initializeActions();
  }

  private initializeActions() {
    return {
      sendMessage: this.sendMessage,
      getMessage: this.getMessage,
      getConversation: this.getConversation,
      deleteConversation: this.deleteConversation,
      deleteMessage: this.deleteMessage,
    };
  }

  private async sendMessage(req: Request, res: Response) {
    const message = req.body.message;

    const createdMessage = await UserModel.create(message);

    if (!createdMessage) {
      return res.status(400).json({
        resStatus: "FAIL",
        message: "Message failed to save!",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      message: "Message sent!",
    });
  }

  private async getMessage(req: Request, res: Response) {
    const message_id = req.params.message_id;

    const message = await Message.find({ id: message_id });

    if (!message) {
      return res.status(400).json({
        resStatus: "FAIL",
        message: "Failed to get message!",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      textMessage: message,
      message: "Received message!",
    });
  }

  private async getConversation(req: Request, res: Response) {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;

    const user1 = await UserModel.findOne({ id: user1_id });
    const user2 = await UserModel.findOne({ id: user2_id });

    if (!user1 || !user2) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "One or both of these users don't exist in the database. Please sync both users to the database!",
      });
    }

    const messageCollection1 = await Message.find({ id: user1_id });
    const messageCollection2 = await Message.find({ id: user2_id });

    const conversation = [...messageCollection1, ...messageCollection2];

    return res.json({
      resStatus: "SUCCESS",
      conversation: conversation,
      message: "Conversation received!",
    });
  }

  private async deleteConversation(req: Request, res: Response) {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;

    const user1 = await UserModel.findOne({ id: user1_id });
    const user2 = await UserModel.findOne({ id: user2_id });

    if (!user1 || !user2) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "One or both of these users don't exist in the database. Please sync both users to the database!",
      });
    }

    const messageCollection1 = await Message.find({ id: user1_id });
    const messageCollection2 = await Message.find({ id: user2_id });

    const conversation = [...messageCollection1, ...messageCollection2];

    for (let i = 0; i < conversation.length; i++) {
      await Message.deleteOne({ id: conversation[i].id });
    }

    return res.json({
      resStatus: "SUCCESS",
      message: "Deleted conversation!",
    });
  }

  private async deleteMessage(req: Request, res: Response) {
    const message_id = req.params.message_id;

    await Message.findOneAndDelete({ id: message_id });

    return res.json({
      resStatus: "SUCCESS",
      message: "Deleted message!",
    });
  }
}

export default new MessageService();
