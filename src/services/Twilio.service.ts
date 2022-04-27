import { Request, Response } from "express";
import twilio from "twilio";

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

class TwilioService {
  public actions;

  constructor() {
    this.actions = this.initializeActions();
  }

  private initializeActions() {
    return {
      // sendPasscode: this.sendPasscode,
      // generate: this.TokenGenerator,
      // createToken: this.createToken,
    };
  }

  // Send Passcode
  // private async sendPasscode(req: Request, res: Response) {
  //   let randomCode = "";
  //   let characters = "0123456789";
  //   let charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     randomCode += characters.charAt(
  //       Math.floor(Math.random() * charactersLength),
  //     );
  //   }
  // }

  // private async createToken(req: Request, res: Response) {
  //   const identity = req.body.identity;

  //   const token = this.TokenGenerator(identity);

  //   res.json({
  //     identity: identity,
  //     token: token.toJwt(),
  //   });
  // }

  // private TokenGenerator(identity: any) {
  //   // Create a "grant" which enables a client to use Chat as a given user
  //   const chatGrant = new ChatGrant({
  //     serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
  //   });

  //   // Create an access token which we will sign and return to the client,
  //   // containing the grant we just created
  //   const token = new AccessToken(
  //     // @ts-ignore
  //     process.env.TWILIO_ACCOUNT_SID,
  //     process.env.TWILIO_API_KEY,
  //     process.env.TWILIO_API_SECRET,
  //   );

  //   token.addGrant(chatGrant);
  //   token.identity = identity;

  //   return token;
  // }
}

export default new TwilioService();
