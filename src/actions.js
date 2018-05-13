import _ from "lodash"

export const LOAD_QUESTIONS = "LOAD_QUESTIONS"
export const ON_NEXT = "ON_NEXT"
export const SET_QUIZ_ID = "SET_QUIZ_ID"
export const SET_NAME = "SET_NAME"
export const ANSWER_QUESTION = "ANSWER_QUESTION"
export const RESET_QUIZ = "RESET_QUIZ"
export const KEY_PRESSED = "KEY_PRESSED"

export function loadQuestions(questions) {
  return { type: LOAD_QUESTIONS, questions }
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_ID, quiz }
}

export function updateName(name) {
  return { type: SET_NAME, name }
}

export function answerQuestion(question, answer) {
  return { type: ANSWER_QUESTION, question, answer }
}

export function resetQuiz() {
  return { type: RESET_QUIZ }
}

export function updatePressedKey(key) {
  return { type: KEY_PRESSED, key }
}

export function nextURL(questions, currentQuestion) {
  let remainingQuestions = questions
  if (!_.isNil(currentQuestion)) {
    remainingQuestions = _.filter(questions, (q) => q.id != currentQuestion.id)
  }
  let nextQuestion = _.first(remainingQuestions)
  
  if (_.isObject(nextQuestion)) {
    return "/questions/"+nextQuestion.id
  } else {
    return "/results"
  }
}
