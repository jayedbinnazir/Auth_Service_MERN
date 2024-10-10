import { UserService } from "services/userService";
import { RegisterRequest } from "../types";
import { NextFunction, Response } from "express";
import { Logger } from "winston";
import createHttpError from "http-errors";
import { validationResult } from "express-validator"; // Correct named import

export class AuthController {
   userService: UserService;

   constructor(
      userService: UserService,
      // eslint-disable-next-line no-unused-vars
      private logger: Logger,
   ) {
      this.userService = userService;
   }

   async register(req: RegisterRequest, res: Response, next: NextFunction) {
      const errorResults = validationResult(req);

      if (!errorResults.isEmpty()) {
         res.status(400).json({ errors: errorResults.array() });
         return;
      }

      const { firstName, lastName, email, password } = req.body;

      this.logger.debug("New request to register a user", {
         firstName,
         lastName,
         email,
         password: "********",
      });

      // if (!email) {
      //    const err = createHttpError(400, "Email is required !");
      //    next(err);
      //    return;
      // }

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
