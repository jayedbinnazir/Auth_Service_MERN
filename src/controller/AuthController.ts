import { UserService } from "services/userService";
import { RegisterRequest } from "../types";
import { NextFunction, Response } from "express";
import { Logger } from "winston";
import { validationResult } from "express-validator"; // Correct named import
import { JwtPayload } from "jsonwebtoken";
import { TokenService } from "services/TokenService";

export class AuthController {
   userService: UserService;

   constructor(
      userService: UserService,
      // eslint-disable-next-line no-unused-vars
      private logger: Logger,
      // eslint-disable-next-line no-unused-vars
      private tokenService: TokenService,
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

         const payLoad: JwtPayload = {
            sub: String(user.id),
            role: user.role,
         };

         const accessToken = this.tokenService.generateAccessToken(payLoad);

         //persists the refresh token

         const newRefreshToken =
            await this.tokenService.persistRefreshToken(user);

         const refreshToken = this.tokenService.generateRefreshToken({
            ...payLoad,
            id: String(newRefreshToken.id),
         });

         res.cookie("accessToken", accessToken, {
            domain: "localhost",
            sameSite: "strict",
            httpOnly: true,
            maxAge: 1000 * 60 * 60, //1h
         });
         res.cookie("refreshToken", refreshToken, {
            domain: "localhost",
            sameSite: "strict",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
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
