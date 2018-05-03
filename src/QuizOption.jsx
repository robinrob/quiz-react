import React from 'react';

export default class QuizOption extends React.Component {
    constructor(props) {
        super(props);

        console.log('this.props: ' + JSON.stringify(this.props, null, '\t'))


        this.state = {
            active: false
        }
    }

    onSetQuiz(quiz) {
        this.setState({
            active: true
        })
        this.props.setQuiz(quiz)
        console.log('this.state: ' + JSON.stringify(this.state, null, '\t'))
    }

    render() {
        return (
            <div className="form-group">
                <label></label>
                <button type="button" className={"btn " + (this.props.quiz.id == this.props.selectedQuiz.id  ? "btn-success" : "btn-primary")} onClick={() => this.onSetQuiz(this.props.quiz)}>{this.props.quiz.label}</button>
            </div>
        )
    }
}