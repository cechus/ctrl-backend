import {getConfigDB} from "./config"
import {Pool, PoolClient, QueryConfig, QueryResult} from "pg"
import highlight from "cli-highlight"

export class DB {
  private pool: Pool

  constructor() {
    this.pool = new Pool(getConfigDB())
  }

  public async getPoolClient(): Promise<PoolClient> {
    try {
      return await this.pool.connect()
    } catch (e) {
      console.log("A client pool error occurred:", e)
      throw e
    }
  }

  // public async query(
  //   sql: string | QueryConfig,
  //   values?: any[],
  // ): Promise<QueryResult> {
  //   console.log("values", values)

  //   let s = sql as string
  //   if (values) {
  //     for (let i = 0; i < values.length; i++) {
  //       console.log("VALUE=" + values[i])
  //       s = s.replace(`$${i + 1}`, values[i])
  //     }
  //   }
  //   console.log("SQL: ")
  //   console.log("SQL: " + s)
  //   // console.log(highlight(s, {language: "sql", ignoreIllegals: true}))
  //   const res = await this.pool.query(sql, values)
  //   return res
  // }

  private async query(
    sql: string | QueryConfig,
    values?: any[],
  ): Promise<QueryResult> {
    let s = sql as string
    if (Array.isArray(values) && values.length) {
      values.forEach((value, index) => {
        s = s.replace(`$${index + 1}`, value)
      })
    }
    console.log("SQL: ")
    console.log(highlight(s, {language: "sql", ignoreIllegals: true}))

    const res = await this.query(sql, values)
    return res
  }

  public async transaction(): Promise<{query: Function; release: Function}> {
    const client = await this.getPoolClient()
    const query = this.query.bind(client)
    const release = client.release.bind(client)

    return {query, release}
  }
}
