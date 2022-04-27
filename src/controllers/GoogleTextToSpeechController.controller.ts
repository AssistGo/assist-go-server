import { Router } from "express";

class GoogleTextToSpeechController {
  public path = "/google";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path + "/text-to-speech");
  }
}

export default new GoogleTextToSpeechController();
