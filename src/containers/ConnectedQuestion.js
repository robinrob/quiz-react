import { connect } from "react-redux"

import _ from "lodash"

import * as actions from "actions"

import Question from "components/Question"

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    name: state.name,
    currentQuestion: _.first(state.questions),
    questions: state.questions,
    pressedKey: state.pressedKey
  }
}

const mapDispatchToProps = dispatch => {
  return {
    nextURL: questions => actions.nextURL(questions),
    answerQuestion: (question, answer) => dispatch(actions.answerQuestion(question, answer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)