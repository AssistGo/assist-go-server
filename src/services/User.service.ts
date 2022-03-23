import { Request, Response } from "express";
import { v4 } from "uuid";
import codes, { by639_1, by639_2T, by639_2B } from "iso-language-codes";
import CreateNewUserDto from "../dto/CreateNewUser.dto";
import UserModel from "../models/User.model";
import { ChangeLanguageDto } from "../dto/ChangeCountryLanguage.dto";

class UserService {
  public actions;

  constructor() {
    this.actions = this.initializeActions();
  }

  private initializeActions() {
    return {
      syncUserData: this.syncUserData,
      getUserInfo: this.getUserInfo,
      changePhoneNumber: this.changePhoneNumber,
      changeUserInfo: this.changeUserInfo,
      deleteAccount: this.deleteAccount,
      removeContact: this.removeContact,
      createContact: this.createContact,
      updateContact: this.updateContact,
      getContact: this.getContact,
      getAllContacts: this.getAllContacts,
      createContactByQRCode: this.createContactByQRCode,
      changeLanguage: this.changeLanguage,
    };
  }

  // Sync OR Create User
  private async syncUserData(req: Request, res: Response) {
    const userDto: CreateNewUserDto = req.body.user;
    const createOrSync: String = req.body.createOrSync;

    if (!userDto) {
      return res
        .status(400)
        .json({ resStatus: "FAIL", message: "Inaccurate Object Schema" });
    }

    createOrSync === "CREATE"
      ? await UserModel.create(userDto)
      : await UserModel.updateOne({ id: userDto.id }, userDto);

    return res.json({
      resStatus: "SUCCESS",
      user: userDto,
      message:
        "Successfully " +
        (createOrSync === "CREATE" ? "created" : "synced") +
        " user!",
    });
  }

  // User info
  private getUserInfo(req: Request, res: Response) {}
  private changePhoneNumber(req: Request, res: Response) {}
  private changeUserInfo(req: Request, res: Response) {}
  private deleteAccount(req: Request, res: Response) {}

  private async changeLanguage(req: Request, res: Response) {
    const languageDto: ChangeLanguageDto = req.body.language;

    const user = await UserModel.findOneAndUpdate(
      { id: languageDto.id },
      { language: languageDto.language },
    );

    if (!user) {
      return res.json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync the user data first!",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      user: user,
      message: "Successfully changed the user's language preference!",
    });
  }

  // Contacts
  private removeContact(req: Request, res: Response) {}
  private createContact(req: Request, res: Response) {}
  private updateContact(req: Request, res: Response) {}
  private getContact(req: Request, res: Response) {}
  private getAllContacts(req: Request, res: Response) {}
  private createContactByQRCode(req: Request, res: Response) {}
}

export default new UserService();

// Tests
// const getIndividualUserTest = async (req: Request, res: Response) => {
//   const danielId = v4();
//   const olamideId = v4();
//   const jieJieId = v4();
//   const dolunayId = v4();
//   const senaId = v4();
//   const phippsId = v4();
//   const atreyId = v4();

//   return res.status(200).json({
//     id: danielId,
//     country: "USA",
//     countryCode: "+1",
//     phoneNumber: "1234567890",
//     fullPhoneNumber: "+11234567890",
//     fullName: "Daniel Nofulla",
//     profileImageUrl:
//       "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//     contactList: [
//       {
//         id: olamideId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567891",
//         fullPhoneNumber: "+11234567891",
//         fullName: "Olamide Oso",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//       },
//       {
//         id: jieJieId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567892",
//         fullPhoneNumber: "+11234567892",
//         fullName: "Jie Jie Bennett",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//       },
//       {
//         id: dolunayId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567893",
//         fullPhoneNumber: "+11234567893",
//         fullName: "Dolunay Dagci",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//       },
//       {
//         id: senaId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567894",
//         fullPhoneNumber: "+11234567894",
//         fullName: "Sena Busacker",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//       },
//       {
//         id: phippsId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567895",
//         fullPhoneNumber: "+11234567895",
//         fullName: "Michael Phipps",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//       },
//       {
//         id: atreyId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567896",
//         fullPhoneNumber: "+11234567896",
//         fullName: "Pradeep Atrey",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//       },
//     ],
//   });
// };

// const getAllUsersTest = async (req: Request, res: Response) => {
//   const danielId = v4();
//   const olamideId = v4();
//   const jieJieId = v4();
//   const dolunayId = v4();
//   const senaId = v4();
//   const phippsId = v4();
//   const atreyId = v4();

//   return res.status(200).json({
//     users: [
//       {
//         id: danielId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567890",
//         fullPhoneNumber: "+11234567890",
//         fullName: "Daniel Nofulla",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//         contactList: [
//           {
//             id: olamideId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567891",
//             fullPhoneNumber: "+11234567891",
//             fullName: "Olamide Oso",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: jieJieId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567892",
//             fullPhoneNumber: "+11234567892",
//             fullName: "Jie Jie Bennett",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: dolunayId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567893",
//             fullPhoneNumber: "+11234567893",
//             fullName: "Dolunay Dagci",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: senaId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567894",
//             fullPhoneNumber: "+11234567894",
//             fullName: "Sena Busacker",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: phippsId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567895",
//             fullPhoneNumber: "+11234567895",
//             fullName: "Michael Phipps",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: atreyId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567896",
//             fullPhoneNumber: "+11234567896",
//             fullName: "Pradeep Atrey",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//         ],
//       },
//       {
//         id: olamideId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567891",
//         fullPhoneNumber: "+11234567891",
//         fullName: "Olamide Oso",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//         contactList: [
//           {
//             id: danielId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567890",
//             fullPhoneNumber: "+11234567890",
//             fullName: "Daniel Nofulla",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: jieJieId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567892",
//             fullPhoneNumber: "+11234567892",
//             fullName: "Jie Jie Bennett",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: dolunayId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567893",
//             fullPhoneNumber: "+11234567893",
//             fullName: "Dolunay Dagci",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: senaId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567894",
//             fullPhoneNumber: "+11234567894",
//             fullName: "Sena Busacker",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: phippsId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567895",
//             fullPhoneNumber: "+11234567895",
//             fullName: "Michael Phipps",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: atreyId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567896",
//             fullPhoneNumber: "+11234567896",
//             fullName: "Pradeep Atrey",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//         ],
//       },
//       {
//         id: jieJieId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567892",
//         fullPhoneNumber: "+11234567892",
//         fullName: "Jie Jie Bennett",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//         contactList: [
//           {
//             id: danielId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567890",
//             fullPhoneNumber: "+11234567890",
//             fullName: "Daniel Nofulla",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: olamideId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567891",
//             fullPhoneNumber: "+11234567891",
//             fullName: "Olamide Oso",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },

//           {
//             id: dolunayId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567893",
//             fullPhoneNumber: "+11234567893",
//             fullName: "Dolunay Dagci",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: senaId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567894",
//             fullPhoneNumber: "+11234567894",
//             fullName: "Sena Busacker",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: phippsId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567895",
//             fullPhoneNumber: "+11234567895",
//             fullName: "Michael Phipps",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: atreyId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567896",
//             fullPhoneNumber: "+11234567896",
//             fullName: "Pradeep Atrey",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//         ],
//       },
//       {
//         id: dolunayId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567893",
//         fullPhoneNumber: "+11234567893",
//         fullName: "Dolunay Dagci",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//         contactList: [
//           {
//             id: danielId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567890",
//             fullPhoneNumber: "+11234567890",
//             fullName: "Daniel Nofulla",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: olamideId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567891",
//             fullPhoneNumber: "+11234567891",
//             fullName: "Olamide Oso",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: jieJieId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567892",
//             fullPhoneNumber: "+11234567892",
//             fullName: "Jie Jie Bennett",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: senaId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567894",
//             fullPhoneNumber: "+11234567894",
//             fullName: "Sena Busacker",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: phippsId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567895",
//             fullPhoneNumber: "+11234567895",
//             fullName: "Michael Phipps",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: atreyId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567896",
//             fullPhoneNumber: "+11234567896",
//             fullName: "Pradeep Atrey",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//         ],
//       },
//       {
//         id: senaId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567894",
//         fullPhoneNumber: "+11234567894",
//         fullName: "Sena Busacker",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//         contactList: [
//           {
//             id: danielId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567890",
//             fullPhoneNumber: "+11234567890",
//             fullName: "Daniel Nofulla",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: olamideId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567891",
//             fullPhoneNumber: "+11234567891",
//             fullName: "Olamide Oso",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: jieJieId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567892",
//             fullPhoneNumber: "+11234567892",
//             fullName: "Jie Jie Bennett",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: dolunayId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567893",
//             fullPhoneNumber: "+11234567893",
//             fullName: "Dolunay Dagci",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: phippsId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567895",
//             fullPhoneNumber: "+11234567895",
//             fullName: "Michael Phipps",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: atreyId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567896",
//             fullPhoneNumber: "+11234567896",
//             fullName: "Pradeep Atrey",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//         ],
//       },
//       {
//         id: phippsId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567895",
//         fullPhoneNumber: "+11234567895",
//         fullName: "Michael Phipps",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//         contactList: [
//           {
//             id: danielId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567890",
//             fullPhoneNumber: "+11234567890",
//             fullName: "Daniel Nofulla",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: olamideId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567891",
//             fullPhoneNumber: "+11234567891",
//             fullName: "Olamide Oso",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: jieJieId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567892",
//             fullPhoneNumber: "+11234567892",
//             fullName: "Jie Jie Bennett",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: dolunayId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567893",
//             fullPhoneNumber: "+11234567893",
//             fullName: "Dolunay Dagci",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: senaId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567894",
//             fullPhoneNumber: "+11234567894",
//             fullName: "Sena Busacker",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: atreyId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567896",
//             fullPhoneNumber: "+11234567896",
//             fullName: "Pradeep Atrey",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//         ],
//       },
//       {
//         id: atreyId,
//         country: "USA",
//         countryCode: "+1",
//         phoneNumber: "1234567896",
//         fullPhoneNumber: "+11234567896",
//         fullName: "Pradeep Atrey",
//         profileImageUrl:
//           "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//         contactList: [
//           {
//             id: danielId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567890",
//             fullPhoneNumber: "+11234567890",
//             fullName: "Daniel Nofulla",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: olamideId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567891",
//             fullPhoneNumber: "+11234567891",
//             fullName: "Olamide Oso",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: jieJieId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567892",
//             fullPhoneNumber: "+11234567892",
//             fullName: "Jie Jie Bennett",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: dolunayId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567893",
//             fullPhoneNumber: "+11234567893",
//             fullName: "Dolunay Dagci",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: senaId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567894",
//             fullPhoneNumber: "+11234567894",
//             fullName: "Sena Busacker",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//           {
//             id: phippsId,
//             country: "USA",
//             countryCode: "+1",
//             phoneNumber: "1234567895",
//             fullPhoneNumber: "+11234567895",
//             fullName: "Michael Phipps",
//             profileImageUrl:
//               "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
//           },
//         ],
//       },
//     ],
//   });
// };

// module.exports = { getIndividualUserTest, getAllUsersTest };
// export { getIndividualUserTest, getAllUsersTest };
