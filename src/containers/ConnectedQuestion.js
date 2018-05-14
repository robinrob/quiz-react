import { connect } from "react-redux"

import * as actions from "actions"

import Question from "components/Question"

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    name: state.name,
    questions: state.questions,
    keyPressedObservable: state.keyPressedObservable,
    currentQuestion: state.questions[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    nextURL: (questions, currentQuestion) => actions.nextURL(questions, currentQuestion),
    answerQuestion: (question, answer) => dispatch(actions.answerQuestion(question, answer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)