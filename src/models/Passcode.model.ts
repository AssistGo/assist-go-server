import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Passcode = new Schema({
  currentFullPhoneNumber: { type: String, unique: false, required: false },
  newFullPhoneNumber: { type: String, unique: false, required: true },
  passcode: { type: String, unique: true, required: true },
  expires: { type: Date, required: true },
});

export default mongoose.model("Passcode", Passcode);
