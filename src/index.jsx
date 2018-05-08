import "./styles/main.sass"
import "bootstrap/dist/css/bootstrap.css"

import { render } from "react-dom"

import React from "react"
import App from "./App"


const renderApp = () => {
  render(
    <App />,
    document.getElementById("root")
  )
}

renderApp()
