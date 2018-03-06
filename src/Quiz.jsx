import React from 'react';

import { Link } from 'react-router-dom';

import 'react-bootstrap';

import _ from 'lodash';


export default class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: ''};
    };

    updateName(name) {
       this.setState({
           name: name
       })
    }

    render() {
        return (
            <div className="quiz top-buffer">
                {form_row(
                    <h1>
                        Welcome to the Cash Flow Quiz!
                    </h1>
                )}
                <div className="row">
                    <div className="spacer-2"></div>
                </div>
                <form>
                    {form_row(
                        <div>
                            <label>What is your name?</label>
                            <input type="text" className="form-control" placeholder="Enter Your Name"
                                   defaultValue={this.state.name} onChange={(e) => this.updateName(e.target.value)}
                                   />
                        </div>
                    )}
                    <div className="row">
                        <div className="spacer-1"></div>
                    </div>
                    {form_row(
                        <div className="nextButtonRow">
                            <label></label>
                            <Link to={"/questions/"+this.props.question_ids[0]}
                                  className="nextBtn btn btn-md btn-primary"
                                  onClick={() => this.props.setName(this.state.name)}
                                  disabled={!this.state.name}
                                  >
                                Next
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        )
    }
}



function form_row(html) {
    return (
        <div className="form-group row">
            <div className="col-xs-12">
                {html}
            </div>
        </div>
    )
};

