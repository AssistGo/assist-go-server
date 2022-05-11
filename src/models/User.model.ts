import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  id: { type: String, unique: true, required: true }, // User Id
  country: { type: String, unique: false, required: true }, // Country Name / Code
  countryCode: { type: String, unique: false, required: true }, // Country Phone Number Code
  phoneNumber: { type: String, unique: false, required: true }, // Pnone Number without country code
  fullPhoneNumber: { type: String, unique: false, required: true }, // Phone Number with country code
  fullName: { type: String, unique: false, required: false }, // Full Name
  profileImageUrl: { type: String, unique: false, required: true }, // Profile Image Url
  // language: { type: String, unique: false, required: true },
  hasSimCard: { type: Boolean, unique: false, required: true },
  callHistory: [
    new Schema({
      historyId: { type: String, unique: false, required: true },
      id: { type: String, unique: false, required: true }, // Contact User's Id
      country: { type: String, unique: false, required: true }, // Country Name / Code
      countryCode: { type: String, unique: false, required: true }, // Country Phone Number Code
      phoneNumber: { type: String, unique: false, required: true }, // Pnone Number without country code
      fullPhoneNumber: { type: String, unique: false, required: true }, // Phone Number with country code
      fullName: { type: String, unique: false, required: false }, // Full Name
      profileImageUrl: { type: String, unique: false, required: true }, // Profile Image Url
      hasSimCard: { type: Boolean, unique: false, required: true },
      timeOfContact: { type: Date, unique: false, required: true },
    }),
  ],
  contactList: [
    // Array of Contacts
    new Schema({
      id: { type: String, unique: false, required: true }, // Contact User's Id
      country: { type: String, unique: false, required: true }, // Country Name / Code
      countryCode: { type: String, unique: false, required: true }, // Country Phone Number Code
      phoneNumber: { type: String, unique: false, required: true }, // Pnone Number without country code
      fullPhoneNumber: { type: String, unique: false, required: true }, // Phone Number with country code
      fullName: { type: String, unique: false, required: false }, // Full Name
      profileImageUrl: { type: String, unique: false, required: true }, // Profile Image Url
      hasSimCard: { type: Boolean, unique: false, required: true },
    }),
  ],
});

export default mongoose.model("User", User);
