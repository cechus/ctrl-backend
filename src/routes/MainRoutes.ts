import {Router} from "express"
import {TryRouter} from "./"

export class MainRouter {
  public readonly router: Router
  constructor() {
    this.router = Router()
    try {
      this.router.use("/", new TryRouter().router)
    } catch (error) {
      console.log("Main Router error:", error)
    }
  }
}
