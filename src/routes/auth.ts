import { AuthController } from "../controller/AuthController";
import express from "express";

const authRouter = express.Router();

const authController = new AuthController();

authRouter.post("/register", (req, res) => authController.register(req, res));

export default authRouter;
