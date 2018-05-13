import React from "react"
import PropTypes from "prop-types"
import NextButton from "components/NextButton"


const initialState = {
  answer: null
}

export default class Question extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = initialState
  }
  
  updateAnswer(answer) {
    this.setState({
      answer: answer
    })
  }

  answerCurrentQuestionAndgoToNext() {
    this.props.answerQuestion(this.props.currentQuestion, this.state.answer)
    this.setState(initialState)
  }

  shouldBeChecked() {
    return true
  }
  
  answerRow(answer, index) {
    // console.log('this.refs.complete.checkbox.checked: ' + this.refs.complete.checkbox.checked)
    
    return (
      <div key={answer.id} className="answer-row">
        {row(
          <div className="form-inline form-group">
            <input type="radio" className="answer-radio" name="answer" value={answer.id} onChange={() => this.updateAnswer(answer)} checked={this.props.pressedKey == "" + (index+1)} />
            <label>{answer.text}</label>
          </div>,
          answer.id
        )}
      </div>
    )
  }
  
  render() {
    return (
      <div className="question top-buffer" key={this.props.currentQuestion.id}>
        {row(<h2>{this.props.currentQuestion.title}</h2>)}
        <form>
          {this.props.currentQuestion.multiple_choice_answers.map((answer, index) => this.answerRow(answer, index))}
        </form>
        {row(
          <NextButton {...this.props}
            toURL={() => this.props.nextURL(this.props.questions, this.props.currentQuestion)}
            isDisabled={() => !this.state.answer }
            onNext={() => this.answerCurrentQuestionAndgoToNext()}
          />
        )}
      </div>
    )
  }
}

Question.propTypes = {
  name: PropTypes.string,
  quiz: PropTypes.object,  
  currentQuestion: PropTypes.object,
  questions: PropTypes.arrayOf(PropTypes.object),
  nextURL: PropTypes.func,
  answerQuestion: PropTypes.func,
  pressedKey: PropTypes.string
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


