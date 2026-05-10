import z from "zod";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { UserServices } from "../services/auth.service";
import responseMessages from "../constants/responseMessages";
import { CreateUserDTO, loginUserDTO } from "../dtos/user.dto";

const userServices = new UserServices();

export class AuthController {

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = CreateUserDTO.safeParse(req.body);

    if (!parsedData.success) {
      return new ApiResponse(StatusCodes.BAD_REQUEST, z.prettifyError(parsedData.error), {})
    }

    const validatedData: CreateUserDTO = parsedData.data;
    const createdUser = await userServices.createUser(validatedData)

    return res.json(new ApiResponse(201, responseMessages.USER.CREATED, createdUser));
  })


  loginUser = asyncHandler(async (req: Request, res: Response) => {

    const parsedData = loginUserDTO.safeParse(req.body);

    if (!parsedData.success) {
      return new ApiResponse(StatusCodes.BAD_REQUEST, z.prettifyError(parsedData.error), {})
    }
    return res.json(new ApiResponse(201, responseMessages.USER.LOGGED_IN, {}));
  })

}
