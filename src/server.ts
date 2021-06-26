import App from "./App"
import {Migrator} from "./DB/Migrator"
// import { WebsocketServer } from "./ws/WebsocketServer"

// const ws = new WebsocketServer(7000)

async function main() {
  await Migrator.migrate()
  App.listen(App.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      App.get("port"),
      App.get("env"),
    )
  })
}

main()
