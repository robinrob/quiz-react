/*jshint esversion: 6 */

import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import PropTypes from "prop-types"

import ConnectedMenu from "containers/ConnectedMenu"
import ConnectedQuiz from "containers/ConnectedQuiz"
import ConnectedQuestion from "containers/ConnectedQuestion"
import ConnectedResults from "containers/ConnectedResults"


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  getAnswers() {
    return this.state.answers
  }
  
  render() {
    return (
      <Router>
        <div id="app" tabIndex="0" className="app container">
          <div className="row">
            <div className="offset-md-2 col-md-4">
              <Route exact path="/menu" component={ConnectedMenu} />
              <Route exact path="/quiz" component={ConnectedQuiz} />
              <Route exact path="/questions/:id" component={ConnectedQuestion} />
              <Route exact path="/results" component={ConnectedResults} />
            </div>
          </div>  
        </div>
      </Router>
    )
  }
}
