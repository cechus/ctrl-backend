import App from "./App"
// import { WebsocketServer } from "./ws/WebsocketServer"

// const ws = new WebsocketServer(7000)

const server = App.listen(App.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    App.get("port"),
    App.get("env"),
  )
})

export default server
