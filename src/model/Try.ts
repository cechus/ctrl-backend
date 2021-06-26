import {DB} from "../DB/db"
import {Try2} from "./Try2"

export class Try extends DB {
  private table = "ctrl"

  public async list() {
    const {query, release} = await this.transaction()
    try {
      await query("BEGIN")
      console.log("select")

      let sql = `
          SELECT *
          FROM ${this.table}
        `
      let res = await query(sql)
      sql = `
          INSERT INTO ${this.table}
            (ctrlid, type, duration, createdat, updatedat, deletedat) VALUES (DEFAULT, 'test', $1, DEFAULT, DEFAULT, null)
            RETURNING *
        `
      res = await query(sql, [12121])

      const try2 = new Try2()
      const res2 = await try2.create()

      sql = `
        INSERT INTO ctrl3
          (ctrlid, type, duration, createdat, updatedat, deletedat) VALUES (DEFAULT, '${res2.ctrlid}', 900, DEFAULT, DEFAULT, null)
          RETURNING *
      `
      res = await query(sql)

      const wait = Date.now() + 5000
      let a: any = 1
      while (Date.now() < wait) {
        a++
      }
      console.log("a", a)
      await query("COMMIT")
    } catch (e) {
      await query("ROLLBACK")
      throw e
    } finally {
      release()
    }
  }
}
