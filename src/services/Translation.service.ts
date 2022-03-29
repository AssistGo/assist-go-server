import { Request, Response } from "express";
import Axios from "axios";
// import codes, { by639_1, by639_2T, by639_2B } from "iso-language-codes";

class TranslationService {
  public actions;

  constructor() {
    this.actions = this.initializeActions();
  }

  private initializeActions() {
    return {
      translate: this.translate,
    };
  }

  // Translate
  private async translate(req: Request, res: Response) {
    const sourceLang: string = req.params.from;
    const destinationLang: string = req.params.to;
    const message: string = req.body.message;

    if (!destinationLang || !message) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "Destination or message not included with the request! Please try again!",
      });
    }

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", message);
    encodedParams.append("target", destinationLang);
    encodedParams.append("source", sourceLang);

    const options: any = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Host": process.env.RAPID_API_GOOGLE_TRANSLATE_HOST,
        "X-RapidAPI-Key": process.env.RAPID_API_GOOGLE_TRANSLATE_KEY,
      },
      data: encodedParams,
    };

    Axios.request(options)
      .then((response) => {
        return res.json({
          resStatus: "SUCCESS",
          translation: response.data.data.translations[0].translatedText,
          message: `Translation of '${message}', received!`,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          resStatus: "FAIL",
          message:
            "Request failed! Please try again or contact service administrator!",
        });
      });
  }
}

export default new TranslationService();
