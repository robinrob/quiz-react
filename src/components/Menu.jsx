import React from "react"

import PropTypes from "prop-types"
import axios from "axios"

import "react-bootstrap"

import NextButton from "components/NextButton"
import ConnectedQuizOption from "containers/ConnectedQuizOption"

function row(html) {
  return (
    <div className="row">
      <div className="col-12">
        {html}
      </div>
    </div>
  )
}

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      quizzes: []
    }

    this.nameInput = React.createRef()
  }

  async componentDidMount() {
    this.nameInput.current.focus()

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
        <ConnectedQuizOption quizOption={quiz} />
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
                ref={this.nameInput}
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
              {this.state.quizzes.map((quiz) => <React.Fragment key={quiz.id}>{this.quizOption(quiz)}</React.Fragment>)}
            </div>
          )}
        </form>
        <form>
          
          {row(
            <NextButton {...this.props}
              toURL={() => "/quiz/"}
              isDisabled={() => this.isDisabled() }
            />
          )}
        </form>
      </div>
    )
  }
}

Menu.propTypes = {
  updateName: PropTypes.func,
  setQuiz: PropTypes.func,
  name: PropTypes.string,
  quiz: PropTypes.object
}
