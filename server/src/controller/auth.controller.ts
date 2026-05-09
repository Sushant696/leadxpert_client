import { Request, Response } from "express"
import asyncHandler from "../utils/asyncHandler"
import ApiResponse from "../utils/apiResponse"

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  return res.json(new ApiResponse(201, "hello world", {}));
})

const createUser = asyncHandler(async (req: Request, res: Response) => {
  return res.json(new ApiResponse(201, "hello world", {}));
})

const logoutuser = asyncHandler(async (req: Request, res: Response) => {
  return res.json(new ApiResponse(201, "hello world", {}));
})

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  return res.json(new ApiResponse(201, "hello world", {}));
})

const verifyMe = asyncHandler(async (req: Request, res: Response) => {
  return res.json(new ApiResponse(201, "hello world", {}));
})

export const authControllers = { loginUser, createUser, refreshAccessToken, logoutuser, verifyMe }
