import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { fromEvent } from 'rxjs'

import ConnectedApp from "./containers/ConnectedApp"
import { rootReducer } from "./reducers"

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

const initialState = {
  name: "",
  questions: [],
  answered_questions: [],
  quiz: {id: null, name: null},
  keyPressedObservable: fromEvent(document, 'keydown')
}

// let store = createStore(rootReducer)
// Save redux store in window object between hot reloads
const store = (() => {
  if ((process.env.NODE_ENV === "development") && window.store) {
    return window.store
  }
  const store = createStore(rootReducer, initialState)
  if (process.env.NODE_ENV === "development") { 
    window.store = store
  }
  return store
})()

store.subscribe(() => console.log(store.getState()))