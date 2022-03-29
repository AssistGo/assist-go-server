export default interface CreateContactDto {
  id: String;
  country: String;
  countryCode: String;
  phoneNumber: String;
  fullPhoneNumber: String;
  fullName?: String;
  profileImageUrl: String;
}
