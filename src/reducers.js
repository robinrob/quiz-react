import * as actions from "./actions"

import _ from "lodash"

export function rootReducer(state, action) {
  switch (action.type) {
    case actions.SET_QUIZ_ID:
      return {...state, quiz: action.quiz}
    case actions.LOAD_QUESTIONS:
      return {...state, questions: action.questions}
    case actions.SET_NAME:
      return {...state, name: action.name }
    case actions.ANSWER_QUESTION:
      return {
        ...state,
        questions: _.drop([...state.questions], 1),
        answered_questions: [...state.answered_questions, {...action.question, answer: action.answer}]
      }
    case actions.RESET_QUIZ:
      return {...initialState, name: state.name}
    case actions.KEY_PRESSED:
      return {...state, keyPressed: action.key}
    default:
      return state
  }
}