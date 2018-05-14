import React from "react"
import PropTypes from "prop-types"
import NextButton from "components/NextButton"
import ConnectedAnswer from "containers/ConnectedAnswer"


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
    return (
      <div key={answer.id} className="answer-row">
       {row(
         <ConnectedAnswer index={index} answer={answer} updateAnswer={(answer) => this.updateAnswer(answer)} currentAnswer={this.state.answer}/>
       )}
       </div>
    )
  }
  
  render() {
    return (
      <div className="question top-buffer" key={this.props.currentQuestion.id}>
        {row(<h2>{this.props.currentQuestion.title}</h2>)}
        <form>
          {this.props.currentQuestion.multiple_choice_answers.map((answer, index) => this.answerRow(answer, index+1))}
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
  keyPressedObservable: PropTypes.object
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


