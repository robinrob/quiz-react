import { connect } from "react-redux"

import Results from "components/Results"

const mapStateToProps = state => {
  return {
    name: state.name,
    answered_questions: state.answered_questions,
    quiz: state.quiz
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetQuiz: () => dispatch(actions.resetQuiz)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)