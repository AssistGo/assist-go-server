export default interface CreateNewUserDto {
  id: String;
  country: String;
  countryCode: String;
  phoneNumber: String;
  fullPhoneNumber: String;
  fullName?: String;
  profileImageUrl: String;
  hasSimCard: Boolean;
  callHistory?: [
    {
      historyId: String;
      id: String;
      country: String;
      countryCode: String;
      phoneNumber: String;
      fullPhoneNumber: String;
      fullName?: String;
      profileImageUrl: String;
      hasSimCard: Boolean;
      timeOfContact: Date;
    },
  ];
  contactList?: [
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
