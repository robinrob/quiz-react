import React from "react"

import PropTypes from "prop-types"

import { Link } from "react-router-dom"

import _ from "lodash"


export default class Result extends React.Component {
  render() {
    const score = _.reduce(this.props.answered_questions, (sum, q) => sum + q.answer.score.value, 0)
    const maxScore = _.reduce(this.props.answered_questions, (sum, q) => sum + _.maxBy(q.answers, "score.value").score.value, 0)
    
    return (
      <div className="results top-buffer">
        <h2>Thank you {this.props.name}</h2>
      
        <p className="result">You scored {score} points out of a possible {maxScore} in our cash flow quiz.</p>
      
        <Link to="/quiz" onClick={this.props.resetQuiz} className="nextBtn btn btn-md btn-primary">
        Try Again
        </Link>
      </div>
      
    )
  }
}

Result.propTypes = {
  name: PropTypes.string,
  resetQuiz: PropTypes.func,
  answered_questions: PropTypes.arrayOf(PropTypes.object)
}