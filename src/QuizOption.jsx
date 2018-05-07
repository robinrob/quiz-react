import React from "react"

import PropTypes from "prop-types"

export default class QuizOption extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      active: false
    }
  }
  
  onSetQuiz(quiz) {
    this.setState({
      active: true
    })
    this.props.setQuiz(quiz)
  }
  
  render() {
    return (
      <div className="form-group">
        <label></label>
        <button type="button" className={"btn " + (this.props.quizOption.id == this.props.quiz.id  ? "btn-success" : "btn-primary")} onClick={() => this.onSetQuiz(this.props.quizOption)}>{this.props.quizOption.label}</button>
      </div>
    )
  }
}

QuizOption.propTypes = {
  setQuiz: PropTypes.func,
  quiz: PropTypes.object,
  quizOption: PropTypes.object
}