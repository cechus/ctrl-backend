import {Router} from "express"
import * as TryController from "../controllers/TryController"
export class TryRouter {
  public readonly router: Router
  constructor() {
    this.router = Router()
    this.router.post("/v1/try", TryController.tryMethod)
  }
}
