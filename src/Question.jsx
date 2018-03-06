import React from 'react';
import queryString from 'query-string';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: {title: ''},
            answers: [],
            answer: null
        }
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

    nextURL() {
        if (this.state.next_id) {
            return "/questions/"+this.state.next_id
        } else {
            return "/results"
        }
    }

    async componentWillMount() {
        try {
            let response = await axios.get('/api/questions/'+this.props.match.params.id+'.json')

            this.setState({
                question: response.data.question,
                answers: response.data.answers,
                next_id: response.data.next_id
            })

        } catch(error) {
            console.log('error: ' + JSON.stringify(error, null, '\t'))
        }

    };

    addAnswer() {
        this.props.addAnswer({
            question_id: this.state.question.id,
            answer_id: this.state.answer.id
        })
    }

    render() {
        let url = this.nextURL()
        console.log('url: ' + url)
        return (
            <div className="question top-buffer">
                {form_row(
                    <h2>{this.state.question.title}</h2>
                )}
                <div className="spacer-1"></div>
                <form>
                    {this.state.answers.map((answer) => this.answerRow(answer))}
                    {form_row(
                        <div className="nextButtonRow">
                            <label></label>
                            <Link to={this.nextURL()} className="nextBtn btn btn-md btn-primary" onClick={() => this.addAnswer()} disabled={!this.state.answer}>Next</Link>
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

