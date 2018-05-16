import { withRouter } from 'react-router'
import * as _ from "lodash"
import * as React from "react"
import NextButton from "components/NextButton"
import ConnectedAnswer from "containers/ConnectedAnswer"
import { QuestionProps, QuestionState } from "interfaces"


class Question extends React.Component<QuestionProps, QuestionState> {
  constructor(props) {
    super(props)
    
    this.state = {
      answer: null
    }
    
    var keyPressedObserver = {
      next: x => this.onKeyPressed(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    }
    this.props.keyPressedObservable.subscribe(keyPressedObserver)
  }

  onKeyPressed(event) {
    if (event.key == "Enter" && !this.isFormDisabled()) {
      this.answerCurrentQuestionAndgoToNext()
    }
  }
  
  updateAnswer(answer) {
    this.setState({
      answer: answer
    })
  }
  
  answerCurrentQuestionAndgoToNext() {
    if (!this.isFormDisabled()) {
      const nextURL = this.props.nextURL(this.props.questions, this.props.questions[0])
      this.props.answerQuestion(this.props.currentQuestion, this.state.answer)
      this.props.history.push(nextURL)
    }
  }
  
  shouldBeChecked() {
    return true
  }
  
  answerRow(answer, index) {
    return (
      <div key={answer.id} className="answer-row">
      {row(
        <ConnectedAnswer {...{
          index: index,
          answer: answer,
          updateAnswer: (answer) => this.updateAnswer(answer),
          currentAnswer:this.state.answer
        }}/>
      )}
      </div>
    )
  }
  
  isFormDisabled() {
    return !this.state.answer
  }
  
  render() {
    if (this.props.currentQuestion) {
      return (
        <div className="question top-buffer" key={this.props.currentQuestion.id}>
        {row(<h2>{this.props.currentQuestion.title}</h2>)}
        <form>
        {this.props.currentQuestion.multiple_choice_answers.map((answer, index) => this.answerRow(answer, index+1))}
        </form>
        {row(
          <NextButton {...this.props, {
            shouldFocus: true,
            isDisabled: () => this.isFormDisabled(),
            onClick: () => this.answerCurrentQuestionAndgoToNext()
          }}
          />
        )}
        </div>
      )
    } else {
      return null
    }
  }
}
export default withRouter(Question)

function row(html) {
  return (
    <div className="row">
    <div className="col-xs-12">
    {html}
    </div>
    </div>
  )
}


