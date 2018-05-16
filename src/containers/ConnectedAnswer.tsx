import { connect } from "react-redux"

import * as _ from "lodash"

import * as actions from "actions"

import Answer from "components/Answer"

const mapStateToProps = state => {
  return {
    keyPressedObservable: state.keyPressedObservable
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer)