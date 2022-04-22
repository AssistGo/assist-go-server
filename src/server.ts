import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

import http from "http";
import { Server as SocketIO } from "socket.io";

// Express App
const app: Application = express();

const server = new http.Server(app);
const io = new SocketIO(server);

// Port Number
const PORT = 8080;

// Controller Imports
import UserController from "./controllers/User.controller";
import MessageController from "./controllers/Message.controller";
import TwilioController from "./controllers/Twilio.controller";
import TranslationController from "./controllers/Translation.controller";

// Middleware Imports
import Logger from "./middleware/Logger.middleware";
import connectDatabase from "./middleware/Database.middleware";

// Connection to MongoDB Database
connectDatabase();

// Express return parameters for requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Cors Middleware
app.use(cors({ origin: "*" }));

// Logger Middleware
app.use(Logger);

// Controller Routes
app.use(UserController.router);
app.use(MessageController.router);
app.use(TwilioController.router);
app.use(TranslationController.router);

// Index Path
app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: "Hello World! Welcome to AssistGo's Back End API!" });
});

io.on("connection", (socket) => {
  console.log("Socket");
  socket.emit("message", "Welcome Back Bitch");

  socket.on("message", (data) => {
    socket.emit("message");
  });
});

server.listen(PORT, () => {
  console.log(`AssistGo server running on port ${PORT}`);
});
