import { connect } from "react-redux"

import * as actions from "actions"

import QuizOption from "components/QuizOption"

const mapStateToProps = state => {
  return {
    quiz: state.quiz
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setQuiz: quiz => dispatch(actions.setQuiz(quiz)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizOption)