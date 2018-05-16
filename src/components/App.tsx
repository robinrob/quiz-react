/*jshint esversion: 6 */

import * as React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import ConnectedMenu from "containers/ConnectedMenu"
import ConnectedQuiz from "containers/ConnectedQuiz"
import ConnectedQuestion from "containers/ConnectedQuestion"
import ConnectedResults from "containers/ConnectedResults"


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Router>
        <div id="app" className="app container">
          <div className="row">
            <div className="offset-md-2 col-md-6">
              <Route exact path="/menu" component={ConnectedMenu} />
              <Route exact path="/quiz" component={ConnectedQuiz} />
              <Route path="/questions/:id" component={ConnectedQuestion} />
              <Route exact path="/results" component={ConnectedResults} />
            </div>
          </div>  
        </div>
      </Router>
    )
  }
}
