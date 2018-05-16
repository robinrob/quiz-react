import * as React from "react"
import { Provider } from "react-redux"

import { store } from "./store"
import ConnectedApp from "./containers/ConnectedApp"


export default class Root extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    )
  }
}
