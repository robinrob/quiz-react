import React from 'react';

import { Link } from 'react-router-dom';

import 'react-bootstrap';

import _ from 'lodash';

import axios from 'axios';

import { ConnectedNextButton } from './App'


export default class Quiz extends React.Component {
    async componentDidMount() {
        try {
            let response = await axios.get('/api/questions')

            this.props.loadQuestions(response.data)
        } catch(error) {
            console.log('error loading questions: ' + error)
        }
    };

    render() {
        return (
            <div className="quiz top-buffer">
                {row(
                    <h1>
                        Welcome to the {this.props.quiz.label} Quiz!
                    </h1>
                )}
                {row(
                    <ConnectedNextButton {...this.props}
                        toURL={() => this.props.nextURL(this.props.questions)}
                        isDisabled={() => !this.props.name }
                        />
                )}
            </div>
        )
    }
}

function row(html) {
    return (
        <div className="row">
            <div className="col-xs-12">
                {html}
            </div>
        </div>
    )
};


