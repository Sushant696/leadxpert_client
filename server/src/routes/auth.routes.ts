import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const authRouter = Router()

const authcontroller = new AuthController();

authRouter.post("/login", authcontroller.loginUser)
authRouter.post("/register", authcontroller.createUser)

export default authRouter
