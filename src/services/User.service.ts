import { Request, Response } from "express";
import { v4 } from "uuid";
import UserModel from "../models/User.model";

import CreateContactDto from "../dto/Contacts/CreateContact.dto";
import { ChangeLanguageDto } from "../dto/User/ChangeCountryLanguage.dto";
import ChangeNumberDto from "../dto/User/ChangeNumber.dto";
import GetUserInfoDto from "../dto/User/GetUserInfo.dto";
import CreateNewUserDto from "../dto/User/CreateNewUser.dto";

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
      // createContactByQRCode: this.createContactByQRCode,
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
  private async getUserInfo(req: Request, res: Response) {
    const id: GetUserInfoDto = req.body;

    const user = await UserModel.findOne({ id: id });

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      user: user,
      message: "Successfully returned user object!",
    });
  }

  private async changePhoneNumber(req: Request, res: Response) {
    const changePhoneNumber: ChangeNumberDto = req.body;

    const user = await UserModel.findOneAndUpdate(
      { id: changePhoneNumber.id },
      { ...changePhoneNumber },
    );

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      user: user,
      message: "Successfully returned user object!",
    });
  }

  private async changeUserInfo(req: Request, res: Response) {
    const userDto: CreateNewUserDto = req.body.user;

    if (!userDto) {
      return res
        .status(400)
        .json({ resStatus: "FAIL", message: "Inaccurate Object Schema" });
    }

    await UserModel.findOneAndUpdate({ id: userDto.id }, { ...userDto });

    return res.json({
      resStatus: "SUCCESS",
      user: userDto,
      message: "Successfully updated user!",
    });
  }

  private async deleteAccount(req: Request, res: Response) {
    const id: String = req.body.id;

    const user = await UserModel.findOneAndDelete({ id });

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message: "Cannot delete user that does not exist!",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      message: "Successfully deleted the user!",
    });
  }

  private async changeLanguage(req: Request, res: Response) {
    const languageDto: ChangeLanguageDto = req.body.language;

    const user = await UserModel.findOneAndUpdate(
      { id: languageDto.id },
      { language: languageDto.language },
    );

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first!",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      user: user,
      message: "Successfully changed the user's language preference!",
    });
  }

  // Contacts

  private async createContact(req: Request, res: Response) {
    const newContact: CreateContactDto = req.body.newContact;
    const id: String = req.body.id;

    const user = await UserModel.findOneAndUpdate(
      { id: id },
      { $push: { contactList: newContact } },
    );

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    return res.json({
      resStatus: true,
      user: user,
      message: "Successfully created added contact to user!",
    });
  }

  private async removeContact(req: Request, res: Response) {
    const userId: String = req.body.id;
    const contactId: String = req.body.contactId;

    const user = await UserModel.findOneAndUpdate(
      { id: userId },
      { $pull: { contactList: { id: contactId } } },
    );

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      contactList: user.contactList,
      message: "Successfully returned the user's contact list!",
    });
  }

  private async updateContact(req: Request, res: Response) {
    const userId: String = req.body.id;
    const updatedContact: String = req.body.contact;

    const user = await UserModel.findOneAndUpdate(
      { id: userId },
      { $set: { "contactList.$": { ...updatedContact } } },
    );

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      contactList: user.contactList,
      message: "Successfully returned the user's contact list!",
    });
  }

  private async getContact(req: Request, res: Response) {
    const userId: String = req.body.id;
    const contactId: String = req.body.contactId;

    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      contactList: user.contactList.find(
        (contact: CreateContactDto, index: Number) => {
          return contact.id === contactId ? contact : undefined;
        },
      ),
      message: "Successfully returned the user's contact list!",
    });
  }

  private async getAllContacts(req: Request, res: Response) {
    const id: String = req.body.id;

    const user = await UserModel.findOne({ id: id });

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      contactList: user.contactList,
      message: "Successfully returned the user's contact list!",
    });
  }

  // May not be necessary
  // private async createContactByQRCode(req: Request, res: Response) {
  //   // TODO
  // }
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
