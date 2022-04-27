import { Router } from "express";
import TranslationService from "../services/Translation.service";

class TwilioController {
  public path = "/translation";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path + "/translate/:from/:to",
      TranslationService.actions.translate,
    );
  }
}

export default new TwilioController();
