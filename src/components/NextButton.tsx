import * as React from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import * as _ from "lodash"

import { NextButtonProps, NextButtonState } from "interfaces"


class NextButton extends React.Component<NextButtonProps, NextButtonState> {
  constructor(props) {
    super(props)
    
    this.state = {
      onClick: _.isFunction(this.props.onClick) ? this.props.onClick : () => {
        this.props.history.push(this.props.toURL())
      },
      button: React.createRef()
    }
  }

  componentDidMount() {
    if (this.props.shouldFocus) {
      this.state.button.current.focus()
    }
  }

  render() {
    return (
      <button
        ref={this.state.button}
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