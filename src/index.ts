import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import "dotenv/config";
import cors from "cors";
const PORT = 8080;
import mongoose from "mongoose";

const connectMongo = async () => {
  return await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@assistgo.iups8.mongodb.net/AssistGo?retryWrites=true&w=majority`,
    (error: any) => {
      if (error) throw error;
      console.log(`Connected to MongoDB Database!`);
    },
  );
};

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use(
  cors({
    origin: "*",
  }),
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: "Welcome to AssistGo's Back End API!" });
});

app.get("/example", (req: Request, res: Response) => {
  return res.status(200).json({
    contacts: [
      {
        nickname: "Daniel Nofulla",
        phoneNumber: "+11234567890",
        pictureUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        nickname: "Olamide Oso",
        phoneNumber: "+21234567890",
        pictureUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        nickname: "Jie Jie Bennett",
        phoneNumber: "+31234567890",
        pictureUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        nickname: "Dolunay Dagci",
        phoneNumber: "+41234567890",
        pictureUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        nickname: "Sena Busacker",
        phoneNumber: "+51234567890",
        pictureUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        nickname: "Michael Phipps",
        phoneNumber: "+61234567890",
        pictureUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
      {
        nickname: "Pradeep Atrey",
        phoneNumber: "+71234567890",
        pictureUrl:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`AssistGo server running on port ${PORT}`);
});
