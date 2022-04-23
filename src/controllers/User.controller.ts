import { Router } from "express";
import UserService from "../services/User.service";

class UserController {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  //http://34.73.16.73:8080/users/sync
  private initializeRoutes() {
    // Test Routes
    // this.router.get(this.path + "/test/all", UserService);
    // this.router.get(this.path + "/test/one", UserService);

    // Sync OR Create User
    this.router.post(this.path + "/sync", UserService.actions.syncUserData);

    // User Info
    this.router.post(this.path + "/info", UserService.actions.getUserInfo);

    this.router.put(
      this.path + "/changeNumber",
      UserService.actions.changePhoneNumber,
    );

    this.router.put(
      this.path + "/info/:user_id",
      UserService.actions.changeUserInfo,
    );

    this.router.delete(
      this.path + "/delete",
      UserService.actions.deleteAccount,
    );

    this.router.put(
      this.path + "/language",
      UserService.actions.changeLanguage,
    );

    // Contacts
    this.router.delete(
      this.path + "/contact",
      UserService.actions.removeContact,
    );

    this.router.post(this.path + "/contact", UserService.actions.createContact);

    this.router.put(this.path + "/contact", UserService.actions.updateContact);

    this.router.get(
      this.path + "/contact/:user_id/:contact_id",
      UserService.actions.getContact,
    );

    this.router.get(
      this.path + "/contact/all/:user_id",
      UserService.actions.getAllContacts,
    );

    // this.router.post(
    //   this.path + "/contact/qr",
    //   UserService.actions.createContactByQRCode,
    // );
  }
}

export default new UserController();
