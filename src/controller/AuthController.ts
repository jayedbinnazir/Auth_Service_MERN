import { UserService } from "services/userService";
import { RegisterRequest } from "../types";
import { Response } from "express";

export class AuthController {
   userService: UserService;

   constructor(userService: UserService) {
      this.userService = userService;
   }

   async register(req: RegisterRequest, res: Response) {
      const { firstName, lastName, email, password } = req.body;

      await this.userService.create({ firstName, lastName, email, password });

      res.status(201).json();
      try {
      } catch (err: unknown) {}
   }
}
