import {PoolConfig} from "pg"
import {ENV} from "../Helper"

export function getConfigDB(): PoolConfig {
  return {
    host: ENV.get("DB_HOST"),
    port: +(ENV.get("DB_POST") || 5432),
    user: ENV.get("DB_USER"),
    password: ENV.get("DB_PASSWORD"),
    database: ENV.get("DB_DATABASE"),
  }
}
