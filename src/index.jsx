import "./styles/main.sass"
import "bootstrap/dist/css/bootstrap.css"

import ReactDOM from "react-dom"
import { AppContainer } from 'react-hot-loader'
import React from "react"
import App from "./App"

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        document.getElementById('root'),
      );
  });
}