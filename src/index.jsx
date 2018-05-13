import "./styles/main.sass"
import "bootstrap/dist/css/bootstrap.css"

import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import React from "react"
import Root from "./Root"

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  )
}

render(Root)

if (module.hot) {
  module.hot.accept("./Root", () => {
    const NextRoot = require("./Root").default
    ReactDOM.render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById("root")
    )
  })
}