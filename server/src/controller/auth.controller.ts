import { Request, Response } from "express"
import asyncHandler from "../utils/asyncHandler"
import ApiResponse from "../utils/apiResponse"

const verifyMe = asyncHandler(async (req: Request, res: Response) => {
  return res.json(new ApiResponse(201, "hello world", {}));
})

export const authControllers = { verifyMe }
