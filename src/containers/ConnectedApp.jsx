import { connect } from "react-redux"

import * as actions from "actions"

import App from "components/App"

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    name: state.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePressedKey: key => dispatch(actions.updatePressedKey(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)