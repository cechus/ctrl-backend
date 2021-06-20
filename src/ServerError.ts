export class ErrorHandler extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
    public data?: any,
  ) {
    super(message)
  }
}

export type ServerErrorType = {
  status: number
  message: string
  code?: string
  data?: any
}
export class ServerError extends ErrorHandler {
  constructor(err: ServerErrorType) {
    super(err.status, err.message, err.code, err.data)
  }
}
