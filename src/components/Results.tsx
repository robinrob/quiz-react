import * as React from "react"
import { Link } from "react-router-dom"
import * as axios from "axios"
import * as _ from "lodash"

import { ResultsProps, ResultsState } from "interfaces"

export default class Result extends React.Component<ResultsProps, ResultsState> {
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
      
        <Link to="/quiz" onClick={() => this.props.resetQuiz()} className="nextBtn btn btn-md btn-primary">
        Try Again
        </Link>
      </div>
      
    )
  }
}