import { Router } from "express";
import { getAllMessagesFromConversation } from "../services/Message.service";

class MessageController {
  public path = "/messages";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(
      this.path + "/test/conversation",
      getAllMessagesFromConversation,
    );
  }
}

export default new MessageController();
