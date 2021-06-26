import Postgrator, {PostgreSQLOptions} from "postgrator"
import path from "path"
import {getConfigDB} from "./config"
import {PoolConfig} from "pg"

export class Migrator {
  public static async migrate(): Promise<void> {
    const config: PoolConfig = getConfigDB() as PoolConfig
    console.log(`Start migrating: [${config.database}]`)

    const postgratorOptions: PostgreSQLOptions = {
      migrationDirectory: path.resolve(__dirname, "../../migrations"),
      driver: "pg",
      host: config.host,
      port: config.port,
      username: config.user,
      password: "cechus",
      database: config.database,
    }
    const postgrator = new Postgrator(postgratorOptions)

    const appliedMigrate = await postgrator.migrate().then()
    console.log(appliedMigrate)
    console.log("Finish migration")
  }
}
