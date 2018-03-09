import React from 'react';

import { Link } from 'react-router-dom';


export default class NextButton extends React.Component {
    render() {
        return (
            <Link to={this.props.toURL()}
                className="nextBtn btn btn-md btn-primary"
                disabled={this.props.isDisabled()}
                onClick={this.props.onNext}
                >
                Next
            </Link>
        )
    }
}