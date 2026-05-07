import { NextFunction } from "express"

async function asyncHandler(cb: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(cb(req, res, next)).catch((err) => next(err))
  }
}

export default asyncHandler
