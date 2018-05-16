import * as React from "react"

import * as interfaces from "interfaces"

export default class Answer extends React.Component<interfaces.AnswerProps> {
  constructor(props) {
    super(props)
    
    var keyPressedObserver = {
      next: x => this.onKeyPressed(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    }
    this.props.keyPressedObservable.subscribe(keyPressedObserver)
  }

  onKeyPressed(event) {
    if (event.key == this.props.index) {
      this.props.updateAnswer(this.props.answer)
    }
  }

  render() { 
    return (
      <div className="form-inline form-group">
        <input type="radio" className="answer-radio" name="answer" value={this.props.answer.id} onChange={() => this.props.updateAnswer(this.props.answer)} checked={this.props.answer == this.props.currentAnswer} />
        <label>{this.props.answer.text}</label>
      </div>
    )
  }
}