export default interface CreateNewUserDto {
  id: String;
  country: String;
  countryCode: String;
  phoneNumber: String;
  fullPhoneNumber: String;
  fullName?: String;
  profileImageUrl: String;
  hasSimCard: Boolean;
  contactList: [
    {
      id: String;
      country: String;
      countryCode: String;
      phoneNumber: String;
      fullPhoneNumber: String;
      fullName?: String;
      profileImageUrl: String;
      hasSimCard: Boolean;
    },
  ];
}
