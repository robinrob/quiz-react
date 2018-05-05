import React from 'react';

import PropTypes from 'prop-types'

import 'react-bootstrap';

import { ConnectedNextButton, ConnectedQuizOption} from './App';

function row(html) {
    return (
        <div className="row">
            <div className="col-xs-12">
                {html}
            </div>
        </div>
    )
}


export default class Menu extends React.Component {
    quizOption(quiz) {
        return <ConnectedQuizOption quizOption={quiz} setQuizId={this.props.setQuizId} />
    }

    isDisabled() {
        return !this.props.quiz.id || !this.props.name
    }

    render() {
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
                            <label>What is your name?</label>
                            <input type="text" className="form-control" placeholder="Enter Your Name"
                                   defaultValue={this.props.name} onChange={(e) => this.props.updateName(e.target.value)}
                                   />
                        </div>
                    )}
                </form>
                
                <form className="form-inline">
                {row(
                    <div className="form-group">
                        <label>Please choose a quiz:</label>
                    </div>
                )}
                {row(
                    this.props.quizes.map((quiz) => <React.Fragment key={quiz.id}>{this.quizOption(quiz)}</React.Fragment>)
                )}
                </form>

                <form>
                {row(
                    <ConnectedNextButton {...this.props}
                        toURL={() => "/quiz/"+this.props.quiz.id}
                        isDisabled={() => this.isDisabled() }
                        />
                )}
                </form>
            </div>
        )
    }
}

Menu.propTypes = {
    updateName: PropTypes.func,
    setQuizId: PropTypes.func,
    name: PropTypes.string,
    quiz: PropTypes.object,
    quizes: PropTypes.arrayOf(PropTypes.object)
}

