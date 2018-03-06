/*jshint esversion: 6 */

import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import Quiz from './Quiz';
import Question from './Question'
import Results from './Results'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      answers: [{}]
    }
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
                <Route exact path="/questions/:id" component={(props) => (<Question {...props} addAnswer={(answer) => this.addAnswer(answer)}/>)} />
                <Route exact path="/results" component={(props) => (<Results {...props} getAnswers={() => this.getAnswers} />)} />
              </div>
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
  


export const SET_NAME = 'SET_NAME'
export const ADD_ANSWER = 'ADD_ANSWER'


const initialState = {
  name: ''
}


function quizApp(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, {
        name: action.name
      })
    default:
      return state
  }
}


let store = createStore(quizApp)


// Log the initial state
console.log(store.getState())
 
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


function setName(name) {
  return {
    type: SET_NAME,
    name
  }
}

function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TODO,
    text
  }
  dispatch(action)
}

const mapStateToProps = state => {
  return {
    name: state.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNext: name => dispatch(setName(name))
  }
}

export const ConnectedQuiz = connect(mapStateToProps, mapDispatchToProps)(Quiz)

console.log(store.getState())