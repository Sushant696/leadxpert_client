import { StatusCodes } from "http-status-codes";

import { bcryptUtil } from "../utils/bcrypt";
import ApiError from "../exceptions/apiError";
import errorMessages from "../constants/errorMessages";
import { CreateUserDTO, loginUserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository()

export class UserServices {

  async createUser(data: CreateUserDTO) {

    const existingUser = await userRepository.getUserByEmail(data.email);

    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, errorMessages.EMAIL.CONFLICT);
    }
    const hashedPassword = await bcryptUtil.generate(data.password, 12);

    const user = await userRepository.createUser({
      ...data,
      password: hashedPassword
    })

    return {
      id: user._id,
      email: user.email,
      name: user.name
    }
  }
  async loginUser(data: loginUserDTO) {
    // 
  }
}
