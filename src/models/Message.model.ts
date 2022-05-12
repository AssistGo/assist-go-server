import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Message = new Schema({
  id: { type: String, unique: true, required: true }, // Message Id
  index: { type: String, unique: false, required: true }, // Index in the chat
  text: { type: String, unique: false, required: true }, // Message Text
  sender: new Schema({
    id: { type: String, unique: false, required: true }, // Sender User Id
    fullName: { type: String, unique: false, required: true }, // Sender Full Name
    fullPhoneNumber: { type: String, unique: false, required: true }, // Sender Full Phone Number
  }),
  receiver: new Schema({
    id: { type: String, unique: false, required: true }, // Receiver User Id
    fullName: { type: String, unique: false, required: true }, // Receiver Full Name
    fullPhoneNumber: { type: String, unique: false, required: true }, // Receiver Full Phone Number
  }),
  sentAt: { type: Date, unique: false, required: true }, // Send Date
});

export default mongoose.model("Message", Message);
