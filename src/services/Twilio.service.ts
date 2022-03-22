import { Request, Response } from "express";

class TwilioService {
  public actions;

  constructor() {
    this.actions = this.initializeActions();
  }

  private initializeActions() {
    return {
      sendPasscode: this.sendPasscode,
    };
  }

  // Send Passcode
  private sendPasscode(req: Request, res: Response) {}
}

export default new TwilioService();
