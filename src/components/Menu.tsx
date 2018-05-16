import * as React from "react"
import * as axios from "axios"
import "react-bootstrap"

import NextButton from "components/NextButton"
import ConnectedQuizOption from "containers/ConnectedQuizOption"
import { MenuProps, MenuState, QuizObject } from "interfaces"


function row(html) {
  return (
    <div className="row">
      <div className="col-12">
        {html}
      </div>
    </div>
  )
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props) {
    super(props)
    
    this.state = {
      quizzes: [],
      nameInputRef: React.createRef()
    }
  }

  async componentDidMount() {
    this.state.nameInputRef.current.focus()

    try {
      let response = await axios.get("/api/quizzes")

      this.setState({
        quizzes: response.data
      })
    } catch(error) {
      alert("quizzes failed to load: " + error)
    }
  }
  
  quizOption(quiz) {
    return (
      <div className="quizOption">
        <ConnectedQuizOption {...{quizOption: quiz}} />
      </div>
    )
  }
  
  isDisabled() {
    return !this.props.quiz || !this.props.name
  }
  
  render() {
    return (
      <div className="menu top-buffer">
        {row(
          <h1>
            Welcome to Quiz!
          </h1>
        )}
        <form>
          {row(
            <div className="form-group">
              <label>What is your name?</label>
              <input type="text" className="form-control" placeholder="Enter Your Name"
                defaultValue={this.props.name} onChange={(e) => this.props.updateName(e.target.value)}
                ref={this.state.nameInputRef}
              />
            </div>
          )}
          {row(
            <div className="form-group">
              <label>Please choose a quiz:</label>
            </div>
          )}
        </form>
        <form className="form-inline">
          {row(
            <div className="form-group">
              <label></label>
              {this.state.quizzes.map((quiz: QuizObject) => <React.Fragment key={quiz.id}>{this.quizOption(quiz)}</React.Fragment>)}
            </div>
          )}
        </form>
        <form>
          
          {row(
            <NextButton {...this.props, {
              toURL: () => "/quiz/",
              isDisabled: () => this.isDisabled()
            }}/>
          )}
        </form>
      </div>
    )
  }
}