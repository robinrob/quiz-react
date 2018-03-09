import React from 'react';
import queryString from 'query-string';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { ConnectedNextButton } from './App'


export default class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answer: null
        }
    }

    updateAnswer(answer) {
        this.setState({
            answer: answer
        });
    };

    answerRow(answer) {
        return (
            <div key={answer.id} className="answer-row">
                {row(
                    <div className="form-inline form-group">
                        <input type="radio" className="answer-radio" name="answer" value={answer.id} onChange={(e) => this.updateAnswer(answer)} />
                        <label>{answer.text}</label>
                    </div>,
                    answer.id
                )}
            </div>
        )
    };

    render() {
        return (
            <div className="question top-buffer">
                {row(<h2>{this.props.currentQuestion.title}</h2>)}
                <form>
                    {this.props.currentQuestion.answers.map((answer) => this.answerRow(answer))}
                </form>
                    {row(
                        <ConnectedNextButton {...this.props}
                            toURL={() => this.props.nextURL(this.props.questions, this.props.currentQuestion)}
                            isDisabled={() => !this.state.answer }
                            onNext={() => this.props.answerQuestion(this.props.currentQuestion, this.state.answer)}
                            />
                    )}
            </div>
        );
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


