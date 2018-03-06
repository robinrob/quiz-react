/*jshint esversion: 6 */

import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router'

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

  setName(name) {
    this.setState({name: name})
  }

  addAnswer(answer) {
    this.setState({
      answers: _.concat(this.state.answers, [answer])
    })
  }

  getAnswers() {
    return this.state.answers
  }

  render() {
    return (
      <HashRouter>
        <div className="App container">
          <div className="row">
            <div className="col-md-7 col-sm-8 col-xs-9">
              <Route exact path="/quiz" component={() => (<Quiz question_ids={[25]} setName={(name) => this.setName(name)}/>)} />
              <Route exact path="/questions/:id" component={(props) => (<Question {...props} addAnswer={(answer) => this.addAnswer(answer)}/>)} />
              <Route exact path="/results" component={(props) => (<Results {...props} getAnswers={() => this.getAnswers} />)} />
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
  
