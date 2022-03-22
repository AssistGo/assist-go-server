import { Router } from "express";
import TwilioService from "../services/Twilio.service";

class TwilioController {
  public path = "/twilio";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path + "/passcode",
      TwilioService.actions.sendPasscode,
    );
  }
}

export default new TwilioController();
