import { Request, Response } from "express";
import Axios from "axios";
// import codes, { by639_1, by639_2T, by639_2B } from "iso-language-codes";

class MessageService {
  public actions;

  constructor() {
    this.actions = this.initializeActions();
  }

  private initializeActions() {
    return {};
  }
}

export default new MessageService();
