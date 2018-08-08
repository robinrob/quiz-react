import * as React from "react"
import * as axios from 'axios'
import "react-bootstrap"

import NextButton from "components/NextButton"
import { QuizProps } from "interfaces"


export default class Quiz extends React.Component<QuizProps> {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      let response = await axios.get("/api/quizzes/" + this.props.quiz.id)
      
      this.props.loadQuestions(response.data.questions.slice(0, 5))
    } catch(error) {
      alert("questions failed to load")
    }
  }
  
  render() {
    return (
      <div className="quiz top-buffer">
        {row(
          <h1>
            Welcome to the {this.props.quiz.name} Quiz! 
          </h1>
        )}
        {row(
          <NextButton {...this.props, {
            shouldFocus: true,
            toURL:() => this.props.nextURL(this.props.questions),
            isDisabled: () => !this.props.name
          }}
          />
        )}
      </div>
    )
  }
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


