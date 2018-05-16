import { createStore } from "redux"
import { fromEvent } from 'rxjs'

import { rootReducer } from "./reducers"

export const initialState = {
  name: "",
  questions: [],
  answered_questions: [],
  quiz: {id: null, name: null},
  keyPressedObservable: fromEvent(document, 'keydown', null, null)
}

window.quiz = {
  store: null
}

// let store = createStore(rootReducer)
// Save redux store in window object between hot reloads
export const store = (() => {
  if ((process.env.NODE_ENV === "development") && window.quiz.store) {
    return window.quiz.store
  }
  const store = createStore(rootReducer, initialState)
  if (process.env.NODE_ENV === "development") { 
    window.quiz.store = store
  }
  return store
})()

store.subscribe(() => console.log(store.getState()))