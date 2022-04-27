import { Router } from "express";
import MessageService from "../services/Message.service";

class MessageController {
  public path = "/messages";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {}
}

export default new MessageController();
