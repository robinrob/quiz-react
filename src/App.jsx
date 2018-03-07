/*jshint esversion: 6 */

import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import axios from 'axios';

import Quiz from './Quiz';
import Question from './Question'
import Results from './Results'


export default class App extends React.Component {
  constructor(props) {
    super(props)
}

  addAnswer(answer) {
    return {
      type: SET_ANSWER
    }
    this.setState({
      answers: _.concat(this.state.answers, [answer])
    })
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
                <Route exact path="/results" component={(props) => (<Results {...props} getAnswers={() => this.getAnswers} />)} />
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
export const ADD_ANSWER = 'ADD_ANSWER'


const initialState = {
  name: '',
  questions: [],
  answers: []
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
    case ON_NEXT:
      return Object.assign({}, state, {
        questions: state.questions.slice()
      })
    case ADD_ANSWER:
      return Object.assign({}, state, {
        answers: _.concat(state.answeas + [action.answer])
      })
  
    default:
      return state
  }
}


let store = createStore(quizApp)


// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


function loadQuestions(questions) {
  return {
    type: LOAD_QUESTIONS,
    questions
  }
}

function nextURL(questions) {
  let URL

  if (questions.length > 0) {
    URL =  "questions/"+questions[0].id
  } else {
    URL = "results"
  }

  return URL
}

function nextQuestion(questions) {
  return questions[0]
}

function onNext(questions) {
  return {
    type: ON_NEXT
  }
}

function updateName(name) {
  return {
    type: SET_NAME,
    name
  }
}

function addAnswer(answer) {
  return {
    type: ADD_ANSWER,
    answer
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    name: state.name,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadQuestions: questions => dispatch(loadQuestions(questions)),
    updateName: name => dispatch(updateName(name)),
    onNext: questions => dispatch(onNext(questions)),
    nextURL: nextURL,
    nextQuestion: nextQuestion,
    addAnswer: answer => dispatch(addAnswer(answer))
  }
}

export const ConnectedQuiz = connect(mapStateToProps, mapDispatchToProps)(Quiz)
export const ConnectedQuestion = connect(mapStateToProps, mapDispatchToProps)(Question)

