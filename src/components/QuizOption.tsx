import * as React from "react"

import { QuizOptionProps } from "interfaces"

export default class QuizOption extends React.Component<QuizOptionProps> {
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
        <button type="button" className={"btn " + (this.props.quizOption.id == this.props.quiz.id  ? "btn-success" : "btn-primary")} onClick={() => this.onSetQuiz(this.props.quizOption)}>{this.props.quizOption.name}</button>
      </div>
    )
  }
}
