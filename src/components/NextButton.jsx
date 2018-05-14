import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import { withRouter } from "react-router"

import _ from "lodash"


class NextButton extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      onClick: _.isFunction(this.props.onClick) ? this.props.onClick : () => {
        this.props.history.push(this.props.toURL())
      }
    }

    this.button = React.createRef()
  }

  componentDidMount() {
    if (this.props.shouldFocus) {
      this.button.current.focus()
    }
  }

  render() {
    return (
      <button
        ref={this.button}
        className={"nextBtn btn btn-md btn-primary " + (this.props.isDisabled() ? "disabled" : "")}
        // disabled={this.props.isDisabled()}
        onClick={() => this.state.onClick()}
      >
        Next
      </button>
    )
  }
}
export default withRouter(NextButton)

NextButton.propTypes = {
  toURL: PropTypes.func,
  isDisabled: PropTypes.func,
  onNext: PropTypes.func
}