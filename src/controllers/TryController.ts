import {NextFunction, Request, Response} from "express"
import {ApiResponse} from "../ApiResponse"
import {ServerError} from "../ServerError"

export const tryMethod = (req: Request, res: Response, next: NextFunction) => {
  const value = Math.floor(Math.random() * 10)
  if (value < 5) {
    const err = new ServerError({
      message: "Random value is less than 5",
      status: 400,
      code: "test_error_code",
      data: `${value} is not valid`,
    })
    return next(err)
  }
  return new ApiResponse(res).success({...req.body})
}
