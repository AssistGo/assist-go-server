import { Request, Response } from "express";
import { v4 } from "uuid";
import UserModel from "../models/User.model";

import CreateContactDto from "../dto/Contacts/CreateContact.dto";
// import { ChangeLanguageDto } from "../dto/User/ChangeCountryLanguage.dto";
import ChangeNumberDto from "../dto/User/ChangeNumber.dto";
import GetUserInfoDto from "../dto/User/GetUserInfo.dto";
import CreateNewUserDto from "../dto/User/CreateNewUser.dto";
import { Storage } from "@google-cloud/storage";
// import Multer from "multer";

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 20 * 1024 * 1024, // No larger than 20mb, change as you need
//   },
// });

let projectId = "crypto-triode-341517"; // Get this from Google Cloud
let keyFilename = "google_keyfile.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("assistgo-bucket"); // Get this from Google Cloud -> Storage

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
      // changeLanguage: this.changeLanguage,
      uploadProfileImage: this.uploadProfileImage,
      userExists: this.userExists,
      hasSimCard: this.hasSimCard,
      addToCallHistory: this.addToCallHistory,
      getCallHistory: this.getCallHistory,
      removeFromCallHistory: this.removeFromCallHistory,
      clearCallHistory: this.clearCallHistory,
    };
  }

  // Sync OR Create User
  private async syncUserData(req: Request, res: Response) {
    const userDto = req.body.user;

    const userDB = await UserModel.findOne({ id: userDto.id });

    if (!userDto) {
      return res
        .status(400)
        .json({ resStatus: "FAIL", message: "User not found!" });
    }

    if (!userDB) {
      await UserModel.create(userDto);
    } else {
      await UserModel.updateOne({ id: userDto.id }, userDto);
    }

    return res.json({
      resStatus: "SUCCESS",
      user: userDto,
      message: "Successfully synced user",
    });
  }

  // User info
  private async getUserInfo(req: Request, res: Response) {
    const id = req.query.user_id;

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

  private async userExists(req: Request, res: Response) {
    const id = req.query.user_id;

    const user = await UserModel.findOne({ id: id });

    if (!user) {
      return res.status(400).json({
        resStatus: "FAIL",
        exists: false,
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    return res.json({
      resStatus: "SUCCESS",
      user: user,
      exists: true,
      message: "Successfully returned user object!",
    });
  }

  private async hasSimCard(req: Request, res: Response) {
    const id = req.query.user_id;

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
      hasSimCard: user.hasSimCard,
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
    const userDto = req.body.user;

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
    const id = req.query.id;

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

  // private async changeLanguage(req: Request, res: Response) {
  //   const languageDto: ChangeLanguageDto = JSON.parse(JSON.parse(req.body)).language;

  //   const user = await UserModel.findOneAndUpdate(
  //     { id: languageDto.id },
  //     { language: languageDto.language },
  //   );

  //   if (!user) {
  //     return res.status(400).json({
  //       resStatus: "FAIL",
  //       message:
  //         "User does not exist in the database. Please sync or create the user in the database first!",
  //     });
  //   }

  //   return res.json({
  //     resStatus: "SUCCESS",
  //     user: user,
  //     message: "Successfully changed the user's language preference!",
  //   });
  // }

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
      resStatus: "SUCCESS",
      user: user,
      message: "Successfully added contact to user!",
    });
  }

  private async addToCallHistory(req: Request, res: Response) {
    const id: String = req.body.id;
    const caller_id: String = req.body.caller_id;

    const caller = await UserModel.findOne({ id: caller_id });

    const user = await UserModel.findOne({ id: id });

    if (!user || !caller) {
      return res.status(400).json({
        resStatus: "FAIL",
        message:
          "User does not exist in the database. Please sync or create the user in the database first.",
      });
    }

    const newUser = await UserModel.updateOne(
      { id: id },
      {
        $push: {
          callHistory: {
            historyId: v4(),
            ...caller,
            timeOfContact: new Date(),
            callHistory: undefined,
            contactList: undefined,
          },
        },
      },
    );
    const newCaller = await UserModel.updateOne(
      { id: caller_id },
      {
        $push: {
          callHistory: {
            historyId: v4(),
            ...user,
            timeOfContact: new Date(),
            callHistory: undefined,
            contactList: undefined,
          },
        },
      },
    );

    return res.json({
      resStatus: "SUCCESS",
      user: newUser,
      message: "Successfully added call to user!",
    });
  }

  private async getCallHistory(req: Request, res: Response) {
    const id = req.query.user_id;

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
      callHistory: user.callHistory,
      message: "Successfully returned the user's call history!",
    });
  }

  private async removeFromCallHistory(req: Request, res: Response) {
    const userId: String = req.body.id;
    const callId: String = req.body.callId;

    const user = await UserModel.findOneAndUpdate(
      { id: userId },
      { $pull: { callHistory: { historyId: callId } } },
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
      callHistory: user.callHistory,
      message: "Successfully removed the call from the user's call history!",
    });
  }

  private async clearCallHistory(req: Request, res: Response) {
    const userId: String = req.body.id;

    const user = await UserModel.findOneAndUpdate(
      { id: userId },
      { callHistory: [] },
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
      message: "Successfully cleared the user's call history!",
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
    const userId = req.query.user_id;
    const contactId = req.query.contact_id;

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
    const id = req.query.user_id;

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

  private async uploadProfileImage(req: Request, res: Response) {
    try {
      if (req.file) {
        const base_url = "https://storage.googleapis.com/assistgo-bucket/";
        console.log(req.file.originalname);

        const full_new_file_name =
          v4() + req.file.originalname.split(".").pop();

        const blob = bucket.file(full_new_file_name);
        const blobStream = blob.createWriteStream();

        const url = base_url + full_new_file_name;

        const id = req.query.user_id;

        let status = false;

        const user = await UserModel.findOneAndUpdate(
          { id: id },
          { profileImageUrl: url },
        );

        if (!user) {
          return res.status(400).json({
            resStatus: "FAIL",
            message:
              "User does not exist in the database. Please sync or create the user in the database first.",
          });
        } else {
          status = true;
        }

        if (status === true) {
          const users = await UserModel.find({});

          for (let i = 0; i < users.length; i++) {
            users[i].contactList.forEach(async (contact: any) => {
              if (contact.id == id) {
                await UserModel.updateOne(
                  { id: users[i].id },
                  {
                    $set: {
                      "contactList.$[a0].profileImageUrl": url,
                    },
                  },
                  {
                    arrayFilters: [{ "a0.id": id }],
                  },
                );
              }
            });
          }
        }

        blobStream.end(req.file.buffer);

        blobStream.on("finish", async () => {
          return res.json({ resStatus: "SUCCESS", imageUrl: url });
        });
      } else {
        res.status(400).json({
          resStatus: "FAIL",
          message: "The image was not found!",
        });
      }
    } catch (error) {
      res.status(400).json({
        resStatus: "FAIL",
        message: "The image was not uploaded successfully!",
      });
    }
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
