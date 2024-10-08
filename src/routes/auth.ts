import { UserService } from "../services/userService";
import { AuthController } from "../controller/AuthController";
import express from "express";
import { AppDataSource } from "../config/data-source";
import { Users } from "../entity/User";
import logger from "../config/logger";
import userValidators from "../../validators/register-validator";
import { Request, Response, NextFunction } from "express";

const authRouter = express.Router();

//dependecies
const userRepository = AppDataSource.getRepository(Users);
const userService = new UserService(userRepository);
const authController = new AuthController(userService, logger);

//Routes
authRouter.post(
   "/register",
   userValidators,
   (req: Request, res: Response, next: NextFunction) =>
      authController.register(req, res, next),
);

export default authRouter;
