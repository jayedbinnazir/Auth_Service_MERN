import { UserService } from "../services/userService";
import { AuthController } from "../controller/AuthController";
import express from "express";
import { AppDataSource } from "../config/data-source";
import { Users } from "../entity/User";

const authRouter = express.Router();

//dependecies
const userRepository = AppDataSource.getRepository(Users);
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

//Routes
authRouter.post("/register", (req, res) => authController.register(req, res));

export default authRouter;
