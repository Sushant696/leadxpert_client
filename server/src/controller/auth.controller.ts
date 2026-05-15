import z from "zod";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { UserServices } from "../services/auth.service";
import responseMessages from "../constants/responseMessages";
import { CreateUserDTO, loginUserDTO } from "../dtos/user.dto";
import ApiError from "../exceptions/apiError";
import cookieConfig from "../utils/cookiesConfig";

const userServices = new UserServices();

export class AuthController {

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = CreateUserDTO.safeParse(req.body);

    if (!parsedData.success) {
      throw new ApiError(StatusCodes.BAD_REQUEST, parsedData.error.message)
    }
    const createdUser = await userServices.createUser(parsedData.data)

    return res.json(new ApiResponse(201, responseMessages.USER.CREATED, createdUser));
  })

  loginUser = asyncHandler(async (req: Request, res: Response) => {

    const parsedData = loginUserDTO.safeParse(req.body);
    if (!parsedData.success) {
      return new ApiResponse(StatusCodes.BAD_REQUEST, z.prettifyError(parsedData.error), {})
    }
    const { accessToken, refreshToken, existingUser } = await userServices.loginUser(parsedData.data);

    res.cookie("accessToken", accessToken, cookieConfig.accessTokenConfig)
    res.cookie("refreshToken", refreshToken, cookieConfig.refreshTokenConfig)

    return res.json(new ApiResponse(201, responseMessages.USER.LOGGED_IN, existingUser));
  })

}
