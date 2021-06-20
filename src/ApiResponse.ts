import express from "express"

type TotalSuccess<T> = {
  data: T
  total: number
}
export class ApiResponse {
  private res: express.Response
  constructor(res: express.Response) {
    this.res = res
  }

  success = <T>(data?: T, status: number = 200) => {
    this.res.status(status).json({
      success: true,
      data,
    })
  }

  total = <T>(data: TotalSuccess<T>, status: number = 200) => {
    this.res.status(status).json({
      success: true,
      ...data,
    })
  }
}
