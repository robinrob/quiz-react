import React from 'react';
import queryString from 'query-string';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: ''
        }
    }

    async componentWillMount() {
        try {
            let response = await axios.post(
                '/api/score',
                {
                    // 5 + 10
                    answers: [{question_id: 25, answer_id: 98}, {question_id: 26, answer_id: 103}]
                },
                {
                    'Content-Type': 'application/json',
                }
            )

            this.setState({
                score: response.data.score
            })

        } catch(error) {
            console.log('error: ' + JSON.stringify(error, null, '\t'))
        }
        
    }

    render() {
        return (
            <div className="results top-buffer">
                <h2>Results</h2>
                <p>Score: {this.state.score}</p>
            </div>
        );
    }
}

