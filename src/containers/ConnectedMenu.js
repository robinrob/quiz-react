import { connect } from "react-redux"

import * as actions from "actions"

import Menu from "components/Menu"

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    name: state.name,
    questions: state.questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setQuiz: quiz => dispatch(actions.setQuiz(quiz)),
    updateName: name => dispatch(actions.updateName(name)),
    nextURL: questions => actions.nextURL(questions)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)