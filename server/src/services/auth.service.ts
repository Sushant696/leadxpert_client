import { StatusCodes } from "http-status-codes";
import { createUserDTO } from "../dtos/user.dto";
import ApiError from "../exceptions/apiError";
import { UserRepository } from "../repositories/user.repository";
import errorMessages from "../constants/errorMessages";
import { bcryptUtil } from "../utils/bcrypt";

export const UserServices = {

  async createUser(data: createUserDTO) {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, errorMessages.EMAIL.CONFLICT);
    }

    const hashedPassword = await bcryptUtil.generate(data.password, 12);

    const user = await UserRepository.create({
      ...data,
      password: hashedPassword
    })
    return {
      id: user._id,
      email: user.email,
      name: user.name
    }

  },

}
