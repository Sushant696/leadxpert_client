import { createUserDTO } from "../dtos/user.dto";
import { User } from "../models/auth.model";

export const UserRepository = {

  async findByEmail(email: string) {
    return User.findOne({ email }).lean()
  },

  async create(data: createUserDTO) {
    return User.create(data)
  }

}
