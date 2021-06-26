import {NextFunction, Request, Response} from "express"
import {ApiResponse} from "../ApiResponse"
import {Try} from "../model/Try"

export const tryMethod = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tryModel = new Try()
    const data = await tryModel.list()
    return new ApiResponse(res).success(data, 201)
  } catch (err) {
    return next(err)
  }
}
