import React from "react"

import PropTypes from "prop-types"

import "react-bootstrap"

import axios from "axios"

import NextButton from "components/NextButton"

export default class Quiz extends React.Component {
  async componentDidMount() {
    try {
      let response = await axios.get("/api/quizzes/" + this.props.quiz.id)
      
      this.props.loadQuestions(response.data.questions.slice(0, 2))
    } catch(error) {
      alert("questions failed to load")
    }
  }
  
  render() {
    return (
      <div className="quiz top-buffer">
        {row(
          <h1>
            Welcome to the {this.props.quiz.label} Quiz! 
          </h1>
        )}
        {row(
          <NextButton {...this.props}
            toURL={() => this.props.nextURL(this.props.questions)}
            isDisabled={() => !this.props.name }
          />
        )}
      </div>
    )
  }
}

Quiz.propTypes = {
  name: PropTypes.string,
  quiz: PropTypes.object,  
  nextURL: PropTypes.func,
  questions: PropTypes.array,
  loadQuestions: PropTypes.func
}

function row(html) {
  return (
    <div className="row">
      <div className="col-xs-12">
        {html}
      </div>
    </div>
  )
}


