import { Router } from "express";
import MessageService from "../services/Message.service";

class MessageController {
  public path = "/messages";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path + "/send", MessageService.actions.sendMessage);
    this.router.get(
      this.path + "/getMessage/:message_id",
      MessageService.actions.getMessage,
    );
    this.router.get(
      this.path + "/getConveration/:user1_id/:user2_id",
      MessageService.actions.getConversation,
    );
    this.router.delete(
      this.path + "/deleteConversation/:user1_id/:user2_id",
      MessageService.actions.deleteConversation,
    );
    this.router.delete(
      this.path + "/deleteMessage/:message_id",
      MessageService.actions.deleteMessage,
    );
  }
}

export default new MessageController();
