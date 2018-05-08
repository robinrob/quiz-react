/*jshint esversion: 6 */

import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import { Provider, connect } from "react-redux"
import { createStore } from "redux"

import _ from "lodash"

import Menu from "./Menu"
import QuizOption from "./QuizOption"
import Quiz from "./Quiz"
import Question from "./Question"
import NextButton from "./NextButton"
import Results from "./Results"


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  getAnswers() {
    return this.state.answers
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app container">
            <div className="row">
              <div className="col-md-8 col-sm-9 col-xs-10">
                <Route exact path="/menu" component={ConnectedMenu} />
                <Route exact path="/quiz/:id" component={ConnectedQuiz} />
                <Route exact path="/questions/:id" component={ConnectedQuestion} />
                <Route exact path="/results" component={ConnectedResults} />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}


export const LOAD_QUESTIONS = "LOAD_QUESTIONS"
export const ON_NEXT = "ON_NEXT"
export const SET_QUIZ_ID = "SET_QUIZ_ID"
export const SET_NAME = "SET_NAME"
export const ANSWER_QUESTION = "ANSWER_QUESTION"
export const RESET_QUIZ = "RESET_QUIZ"


const quizes = [
  {id: "capitals", label: "Capitals"},
  {id: "phobias", label: "Phobias"}
]

const initialState = {
  name: "",
  questions: [],
  answered_questions: [],
  quizes: quizes,
  quiz: {id: null, name: null}
}


function quizApp(state = initialState, action) {
  switch (action.type) {
    case SET_QUIZ_ID:
      return {...state, quiz: action.quiz}
    case LOAD_QUESTIONS:
      return {...state, questions: action.questions}
    case SET_NAME:
      return {...state, name: action.name }
    case ANSWER_QUESTION:
      return {
        ...state,
        questions: [...state.questions].slice(1),
        answered_questions: [...state.answered_questions, {...action.question, answer: action.answer}]
      }
    case RESET_QUIZ:
      return {...initialState, name: state.name}
    default:
      return state
  }
}

// let store = createStore(quizApp)
// Save redux store in window object between hot reloads
const store = (() => {
  if ((process.env.NODE_ENV === "development") && window.store) {
    return window.store
  }
  const store = createStore(quizApp)
  if (process.env.NODE_ENV === "development") { 
    window.store = store
  }
  return store
})()

store.subscribe(() => console.log(store.getState()))

function loadQuestions(questions) {
  return {
    type: LOAD_QUESTIONS,
    questions
  }
}

function nextURL(questions, currentQuestion) {
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

function setQuiz(quiz) {
  return {
    type: SET_QUIZ_ID,
    quiz
  }
}

function updateName(name) {
  return {
    type: SET_NAME,
    name
  }
}

function answerQuestion(question, answer) {
  return {
    type: ANSWER_QUESTION,
    question: question,
    answer: answer
  }
}

const mapStateToProps = state => {
  return {
    quizes: state.quizes,
    quiz: state.quiz,
    name: state.name,
    currentQuestion: _.first(state.questions),
    questions: state.questions,
    answered_questions: state.answered_questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadQuestions: questions => dispatch(loadQuestions(questions)),
    setQuiz: quiz => dispatch(setQuiz(quiz)),
    updateName: name => dispatch(updateName(name)),
    nextURL: nextURL,
    answerQuestion: (question, answer) => dispatch(answerQuestion(question, answer)),
    resetQuiz: () => dispatch({ type: RESET_QUIZ })
  }
}

export const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export const ConnectedQuizOption = connect(mapStateToProps, mapDispatchToProps)(QuizOption)
export const ConnectedQuiz = connect(mapStateToProps, mapDispatchToProps)(Quiz)
export const ConnectedQuestion = connect(mapStateToProps, mapDispatchToProps)(Question)
export const ConnectedNextButton = connect(mapStateToProps, mapDispatchToProps)(NextButton)
export const ConnectedResults = connect(mapStateToProps, mapDispatchToProps)(Results)

