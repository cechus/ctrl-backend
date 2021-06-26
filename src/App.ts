import express, {NextFunction, Request, Response} from "express"
import compression from "compression"
import logger from "morgan"
import {ENV} from "./Helper"
import {MainRouter} from "./routes/MainRoutes"
import {ServerError} from "./ServerError"

const app = express()
app.disable("x-powered-by")
app.set("port", ENV.get("PORT") || 5000)

app
  .use(
    logger("dev"),
    // logger(":method :url :status :res[content-length] - :response-time ms")
  )
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .use("/", new MainRouter().router)
  .use(middleware404)
  .use(errorHandler)

function middleware404(req: Request, _res: Response, next: NextFunction) {
  const err = new ServerError({
    status: 404,
    message: "Not Found",
    code: "route_not_exists",
    data: `No router for Requested URL ${req.url} `,
  })
  next(err)
}

function errorHandler(
  err: ServerError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!err.status) {
    err.status = 500
  }
  if (!err.code) {
    err.code = "unexpected_error"
  }
  if (err.status === 500) {
    console.error("=============ERROR=============")
    console.error(err)
    console.error("=============/ERROR=============")
  }
  res.status(err.status)
  const response = {
    success: false,
    message: err.message,
    code: err.code,
    data: err.data,
  }
  res.json(response)
}

export default app
