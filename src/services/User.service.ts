import { Request, Response } from "express";
import { v4 } from "uuid";

const getIndividualUserTest = async (req: Request, res: Response) => {
  const danielId = v4();
  const olamideId = v4();
  const jieJieId = v4();
  const dolunayId = v4();
  const senaId = v4();
  const phippsId = v4();
  const atreyId = v4();

  return res.status(200).json({
    id: danielId,
    country: "USA",
    countryCode: "+1",
    phoneNumber: "1234567890",
    fullPhoneNumber: "+11234567890",
    fullName: "Daniel Nofulla",
    profileImageUrl:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    contactList: [
      {
        id: olamideId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567891",
        fullPhoneNumber: "+11234567891",
        fullName: "Olamide Oso",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        id: jieJieId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567892",
        fullPhoneNumber: "+11234567892",
        fullName: "Jie Jie Bennett",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        id: dolunayId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567893",
        fullPhoneNumber: "+11234567893",
        fullName: "Dolunay Dagci",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        id: senaId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567894",
        fullPhoneNumber: "+11234567894",
        fullName: "Sena Busacker",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        id: phippsId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567895",
        fullPhoneNumber: "+11234567895",
        fullName: "Michael Phipps",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        id: atreyId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567896",
        fullPhoneNumber: "+11234567896",
        fullName: "Pradeep Atrey",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
    ],
  });
};

const getAllUsersTest = async (req: Request, res: Response) => {
  const danielId = v4();
  const olamideId = v4();
  const jieJieId = v4();
  const dolunayId = v4();
  const senaId = v4();
  const phippsId = v4();
  const atreyId = v4();

  return res.status(200).json({
    users: [
      {
        id: danielId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567890",
        fullPhoneNumber: "+11234567890",
        fullName: "Daniel Nofulla",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        contactList: [
          {
            id: olamideId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567891",
            fullPhoneNumber: "+11234567891",
            fullName: "Olamide Oso",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: jieJieId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567892",
            fullPhoneNumber: "+11234567892",
            fullName: "Jie Jie Bennett",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: dolunayId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567893",
            fullPhoneNumber: "+11234567893",
            fullName: "Dolunay Dagci",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: senaId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567894",
            fullPhoneNumber: "+11234567894",
            fullName: "Sena Busacker",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: phippsId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567895",
            fullPhoneNumber: "+11234567895",
            fullName: "Michael Phipps",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: atreyId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567896",
            fullPhoneNumber: "+11234567896",
            fullName: "Pradeep Atrey",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
        ],
      },
      {
        id: olamideId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567891",
        fullPhoneNumber: "+11234567891",
        fullName: "Olamide Oso",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        contactList: [
          {
            id: danielId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567890",
            fullPhoneNumber: "+11234567890",
            fullName: "Daniel Nofulla",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: jieJieId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567892",
            fullPhoneNumber: "+11234567892",
            fullName: "Jie Jie Bennett",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: dolunayId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567893",
            fullPhoneNumber: "+11234567893",
            fullName: "Dolunay Dagci",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: senaId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567894",
            fullPhoneNumber: "+11234567894",
            fullName: "Sena Busacker",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: phippsId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567895",
            fullPhoneNumber: "+11234567895",
            fullName: "Michael Phipps",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: atreyId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567896",
            fullPhoneNumber: "+11234567896",
            fullName: "Pradeep Atrey",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
        ],
      },
      {
        id: jieJieId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567892",
        fullPhoneNumber: "+11234567892",
        fullName: "Jie Jie Bennett",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        contactList: [
          {
            id: danielId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567890",
            fullPhoneNumber: "+11234567890",
            fullName: "Daniel Nofulla",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: olamideId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567891",
            fullPhoneNumber: "+11234567891",
            fullName: "Olamide Oso",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },

          {
            id: dolunayId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567893",
            fullPhoneNumber: "+11234567893",
            fullName: "Dolunay Dagci",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: senaId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567894",
            fullPhoneNumber: "+11234567894",
            fullName: "Sena Busacker",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: phippsId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567895",
            fullPhoneNumber: "+11234567895",
            fullName: "Michael Phipps",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: atreyId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567896",
            fullPhoneNumber: "+11234567896",
            fullName: "Pradeep Atrey",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
        ],
      },
      {
        id: dolunayId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567893",
        fullPhoneNumber: "+11234567893",
        fullName: "Dolunay Dagci",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        contactList: [
          {
            id: danielId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567890",
            fullPhoneNumber: "+11234567890",
            fullName: "Daniel Nofulla",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: olamideId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567891",
            fullPhoneNumber: "+11234567891",
            fullName: "Olamide Oso",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: jieJieId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567892",
            fullPhoneNumber: "+11234567892",
            fullName: "Jie Jie Bennett",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: senaId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567894",
            fullPhoneNumber: "+11234567894",
            fullName: "Sena Busacker",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: phippsId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567895",
            fullPhoneNumber: "+11234567895",
            fullName: "Michael Phipps",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: atreyId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567896",
            fullPhoneNumber: "+11234567896",
            fullName: "Pradeep Atrey",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
        ],
      },
      {
        id: senaId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567894",
        fullPhoneNumber: "+11234567894",
        fullName: "Sena Busacker",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        contactList: [
          {
            id: danielId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567890",
            fullPhoneNumber: "+11234567890",
            fullName: "Daniel Nofulla",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: olamideId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567891",
            fullPhoneNumber: "+11234567891",
            fullName: "Olamide Oso",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: jieJieId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567892",
            fullPhoneNumber: "+11234567892",
            fullName: "Jie Jie Bennett",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: dolunayId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567893",
            fullPhoneNumber: "+11234567893",
            fullName: "Dolunay Dagci",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: phippsId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567895",
            fullPhoneNumber: "+11234567895",
            fullName: "Michael Phipps",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: atreyId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567896",
            fullPhoneNumber: "+11234567896",
            fullName: "Pradeep Atrey",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
        ],
      },
      {
        id: phippsId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567895",
        fullPhoneNumber: "+11234567895",
        fullName: "Michael Phipps",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        contactList: [
          {
            id: danielId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567890",
            fullPhoneNumber: "+11234567890",
            fullName: "Daniel Nofulla",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: olamideId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567891",
            fullPhoneNumber: "+11234567891",
            fullName: "Olamide Oso",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: jieJieId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567892",
            fullPhoneNumber: "+11234567892",
            fullName: "Jie Jie Bennett",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: dolunayId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567893",
            fullPhoneNumber: "+11234567893",
            fullName: "Dolunay Dagci",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: senaId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567894",
            fullPhoneNumber: "+11234567894",
            fullName: "Sena Busacker",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: atreyId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567896",
            fullPhoneNumber: "+11234567896",
            fullName: "Pradeep Atrey",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
        ],
      },
      {
        id: atreyId,
        country: "USA",
        countryCode: "+1",
        phoneNumber: "1234567896",
        fullPhoneNumber: "+11234567896",
        fullName: "Pradeep Atrey",
        profileImageUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        contactList: [
          {
            id: danielId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567890",
            fullPhoneNumber: "+11234567890",
            fullName: "Daniel Nofulla",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: olamideId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567891",
            fullPhoneNumber: "+11234567891",
            fullName: "Olamide Oso",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: jieJieId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567892",
            fullPhoneNumber: "+11234567892",
            fullName: "Jie Jie Bennett",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: dolunayId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567893",
            fullPhoneNumber: "+11234567893",
            fullName: "Dolunay Dagci",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: senaId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567894",
            fullPhoneNumber: "+11234567894",
            fullName: "Sena Busacker",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
          {
            id: phippsId,
            country: "USA",
            countryCode: "+1",
            phoneNumber: "1234567895",
            fullPhoneNumber: "+11234567895",
            fullName: "Michael Phipps",
            profileImageUrl:
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          },
        ],
      },
    ],
  });
};

module.exports = { getIndividualUserTest, getAllUsersTest };
export { getIndividualUserTest, getAllUsersTest };
