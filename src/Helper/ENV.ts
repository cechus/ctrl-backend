import dotenv from "dotenv"
dotenv.config()

export class ENV {
  static get(key: string) {
    return process.env[key]
  }
}
