import { Router, Request, Response } from "express";

class GoogleTextToSpeechController {
  public path = "/google";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(
      this.path + "/text-to-speech",
      async (req: Request, res: Response) => {
        return res.json({
          resStatus: "SUCCESS",
          message:
            "Text To Speech moved to Android. This Endpoint is Deprecated!",
        });
      },
    );
  }
}

export default new GoogleTextToSpeechController();
