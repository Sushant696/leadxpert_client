import { Router } from "express";
import { authControllers } from "../controller/auth.controller";

const authRouter = Router()

authRouter.get("/me", authControllers.verifyMe)

export default authRouter
