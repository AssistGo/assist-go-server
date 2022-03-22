import { Request, Response } from "express";
import translate from "translate";

class TranslationService {
  public actions;

  constructor() {
    this.actions = this.initializeActions();
    translate.engine = "google";
    translate.key = process.env.GOOGLE_TRANSLATE_KEY;
  }

  private initializeActions() {
    return {
      translate: this.translate,
    };
  }

  // Translate
  private translate(req: Request, res: Response) {}
}

export default new TranslationService();
