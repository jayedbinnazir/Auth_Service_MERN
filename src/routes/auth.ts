import { UserService } from "../services/userService";
import { AuthController } from "../controller/AuthController";
import express from "express";
import { AppDataSource } from "../config/data-source";
import { Users } from "../entity/User";
import logger from "../config/logger";
import userValidators from "../../validators/register-validator";
import { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/TokenService";
import { RefreshToken } from "../entity/RefreshToken";

const authRouter = express.Router();

//dependecies
const userRepository = AppDataSource.getRepository(Users);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
const userService = new UserService(userRepository);
const tokenSevice = new TokenService(refreshTokenRepository);
const authController = new AuthController(userService, logger, tokenSevice);

//Routes
authRouter.post(
   "/register",
   userValidators,
   (req: Request, res: Response, next: NextFunction) =>
      authController.register(req, res, next),
);

export default authRouter;
