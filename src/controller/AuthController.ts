import { UserService } from "services/userService";
import { RegisterRequest } from "../types";
import { NextFunction, Response } from "express";
import { Logger } from "winston";

export class AuthController {
   userService: UserService;

   constructor(
      userService: UserService,
      private logger: Logger,
   ) {
      this.userService = userService;
   }

   async register(req: RegisterRequest, res: Response, next: NextFunction) {
      const { firstName, lastName, email, password } = req.body;

      this.logger.debug("New request to register a user", {
         firstName,
         lastName,
         email,
         password: "********",
      });

      try {
         const user = await this.userService.create({
            firstName,
            lastName,
            email,
            password,
         });

         this.logger.info("user has been registerd", {
            id: user.id,
            role: user.role,
         });

         res.status(201).json({
            id: user.id,
         });
      } catch (err) {
         next(err);
         return;
      }
   }
}
