import { connect } from "react-redux"

import * as actions from "actions"

import Quiz from "components/Quiz"

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    name: state.name,
    questions: state.questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadQuestions: questions => dispatch(actions.loadQuestions(questions)),
    nextURL: questions => actions.nextURL(questions)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)