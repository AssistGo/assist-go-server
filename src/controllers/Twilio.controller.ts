import { Router } from "express";
import TwilioService from "../services/Twilio.service";

class TwilioController {
  public path = "/twilio";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(
    //   this.path + "/passcode",
    //   TwilioService.actions.sendPasscode,
    // );
    // this.router.post(
    //   this.path + "/createToken",
    //   TwilioService.actions.createToken,
    // );
  }
}

export default new TwilioController();
