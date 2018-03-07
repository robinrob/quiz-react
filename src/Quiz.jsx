import React from 'react';

import { Link } from 'react-router-dom';

import 'react-bootstrap';

import _ from 'lodash';

import axios from 'axios';


export default class Quiz extends React.Component {
    constructor(props) {
        super(props);

        console.log('this.props: ' + JSON.stringify(this.props, null, '\t'))
    };

    async componentWillMount() {
        try {
            let response = await axios.get('/api/questions')

            this.props.loadQuestions(response.data)
        } catch(error) {
            console.log(error)
        }
    };

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
                                   defaultValue={this.props.name} onChange={(e) => this.props.updateName(e.target.value)}
                                   />
                        </div>
                    )}
                    <div className="row">
                        <div className="spacer-1"></div>
                    </div>
                    {form_row(
                        <div className="nextButtonRow">
                            <label></label>
                            <Link to={this.props.nextURL(this.props.questions)}
                                  className="nextBtn btn btn-md btn-primary"
                                  disabled={!this.props.name}
                                  onClick={() => this.props.onNext(this.props.questions)}
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

