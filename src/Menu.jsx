import React from 'react';

import { Link } from 'react-router-dom';

import 'react-bootstrap';

import _ from 'lodash';

import axios from 'axios';

import { ConnectedNextButton, ConnectedQuizOption} from './App';


export default class Menu extends React.Component {
    quizOption(quiz) {
        console.log('quiz: ' + JSON.stringify(quiz, null, '\t'))

        return (<ConnectedQuizOption quiz={quiz} setQuizId={this.props.setQuizId}></ConnectedQuizOption>)
    }

    render() {
        console.log('this.props: ' + JSON.stringify(this.props, null, '\t'))

        return (
            <div className="menu top-buffer">
                {row(
                    <h1>
                        Welcome to Quiz!
                    </h1>
                )}
                <form>
                
                {row(
                    <div className="form-group">
                        <label>Please choose a quiz:</label>
                    </div>
                )}
                {this.props.quizes.map((quiz) => (<div key={quiz.id}>{this.quizOption(quiz)}</div>))}
                </form>
                {row(
                    <ConnectedNextButton {...this.props}
                        toURL={() => "/quiz/"+this.props.selectedQuiz.id}
                        isDisabled={() => !this.props.selectedQuiz.id }
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
