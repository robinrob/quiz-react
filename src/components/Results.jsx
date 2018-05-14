import React from "react"

import PropTypes from "prop-types"

import { Link } from "react-router-dom"

import axios from "axios"

import _ from "lodash"


export default class Result extends React.Component {
  constructor(props) {
    super(props)

    this.state = { score: 0 }
  }

  async componentDidMount() {
    try {
      let response = await axios.post(
        "/api/score_quiz",
        { answered_questions: this.props.answered_questions }
      )

      this.setState({
        score: response.data.score
      })
    } catch(error) {
      alert("score failed to load")
    }
  }

  render() {
    return (
      <div className="results top-buffer">
        <h2>Thank you {this.props.name}</h2>
      
        <p className="result">You scored {this.state.score} points out of a possible {this.props.answered_questions.length} in our {this.props.quiz.name} quiz.</p>
      
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