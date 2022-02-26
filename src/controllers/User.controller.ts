import { Router } from "express";
import {
  getAllUsersTest,
  getIndividualUserTest,
} from "../services/User.service";

class UserController {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path + "/test/all", getAllUsersTest);
    this.router.get(this.path + "/test/one", getIndividualUserTest);
  }
}

export default new UserController();
