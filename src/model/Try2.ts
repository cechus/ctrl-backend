import {DB} from "../DB/db"

export class Try2 extends DB {
  public async create() {
    const {query, release} = await this.transaction()
    try {
      await query("BEGIN")
      const sql = `
        INSERT INTO ctrl2
          (ctrlid, type, duration, createdat, updatedat, deletedat) VALUES (DEFAULT, 'test', $1 , DEFAULT, DEFAULT, null)
          RETURNING *
      `
      const res = await query(sql, [12313123123123])
      await query("COMMIT")
      return res.rows[0]
    } catch (e) {
      await query("ROLLBACK")
      throw e
    } finally {
      release()
    }
  }
}
