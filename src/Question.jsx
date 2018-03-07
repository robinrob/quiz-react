import React from 'react';
import queryString from 'query-string';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
    }

    updateAnswer(answer) {
        this.setState({
            answer: answer
        });
    };

    answerRow(answer) {
        return form_row(
            <div className="form-inline">
                <input type="radio" className="answer-radio" name="answer" value={answer.id} onChange={(e) => this.updateAnswer(answer)} />
                <label>{answer.text}</label>
            </div>,
            answer.id
        )
    };

    addAnswer() {
        this.props.addAnswer({
            question_id: this.state.question.id,
            answer_id: this.state.answer.id
        })
    }

    render() {
        let question = this.props.nextQuestion(this.props.questions)
        return (
            <div className="question top-buffer">
                {form_row(
                    <h2>{question.title}</h2>
                )}
                <div className="spacer-1"></div>
                <form>
                    {question.answers.map((answer) => this.answerRow(answer))}
                    {form_row(
                        <div className="nextButtonRow">
                            <label></label>
                            <Link to={this.props.nextURL } className="nextBtn btn btn-md btn-primary" onClick={() => this.props.addAnswer(this.state.answer)} disabled={!this.state.answer}>Next</Link>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}

function form_row(html, key) {
    return (
        <div className="form-group row" key={key}>
            <div className="col-md-12">
                {html}
            </div>
        </div>
    )
};

