/*jshint esversion: 6 */

import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import axios from 'axios';

import Quiz from './Quiz';
import Question from './Question'
import NextButton from './NextButton'
import Results from './Results'


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
        <HashRouter>
          <div className="App container">
            <div className="row">
              <div className="col-md-7 col-sm-8 col-xs-9">
                <Route exact path="/quiz" component={ConnectedQuiz} />
                <Route exact path="/questions/:id" component={ConnectedQuestion} />
                <Route exact path="/results" component={ConnectedResults} />
              </div>
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
  

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS'
export const ON_NEXT = 'ON_NEXT'
export const SET_NAME = 'SET_NAME'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const RESET_QUIZ = 'RESET_QUIZ'


const initialState = {
  name: '',
  questions: [],
  answered_questions: []
}


function quizApp(state = initialState, action) {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.questions
      })
    case SET_NAME:
      return Object.assign({}, state, {
        name: action.name
      })
    case ANSWER_QUESTION:
      return Object.assign({}, state, {
        questions: state.questions.slice(1),
        answered_questions: _.concat(
          state.answered_questions,
          [Object.assign(action.question, {answer: action.answer})]
        )
      })
    case RESET_QUIZ:
      return Object.assign(initialState, {name: state.name})
    default:
      return state
  }
}

let store = createStore(quizApp)

const unsubscribe = store.subscribe(() => console.log(store.getState()))

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
    name: state.name,
    currentQuestion: _.first(state.questions),
    questions: state.questions,
    answered_questions: state.answered_questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadQuestions: questions => dispatch(loadQuestions(questions)),
    updateName: name => dispatch(updateName(name)),
    nextURL: nextURL,
    answerQuestion: (question, answer) => dispatch(answerQuestion(question, answer)),
    resetQuiz: () => dispatch({ type: RESET_QUIZ })
  }
}

export const ConnectedQuiz = connect(mapStateToProps, mapDispatchToProps)(Quiz)
export const ConnectedQuestion = connect(mapStateToProps, mapDispatchToProps)(Question)
export const ConnectedNextButton = connect(mapStateToProps, mapDispatchToProps)(NextButton)
export const ConnectedResults = connect(mapStateToProps, mapDispatchToProps)(Results)

