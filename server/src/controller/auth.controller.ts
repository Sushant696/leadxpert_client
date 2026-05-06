import { Request, Response } from "express"

const verifyMe = async (req: Request, res: Response) => {
  return res.json("you are a verified user")
}

export const authControllers = { verifyMe }
