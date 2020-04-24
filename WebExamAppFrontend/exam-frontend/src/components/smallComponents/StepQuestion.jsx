import React, { Component } from 'react';
import AnswerManager from './AnswerManager';

class StepQuestion extends Component {
    state = {
        step: this.props.step,
        question: this.props.question,
        overlayed : 
        {
            overlay: false,
            extras : null,
        },
      }
    
    handleEdit = (event) =>
    {
        event.preventDefault();
        let extras = {
            id: this.props.step,
            value: this.props.question.answer,
            question: this.props.question.title,
            answerCount: event.target.title,
            placeholder: "Your Answser",
        }
        this.props.SetAnswer(this.props.step,[""]);
        this.setState({overlayed:
        {
            overlay: true,
            extras:extras,
        }});
    }

    GetListedBody(array)
    {
        let listedBody = [];
        for(let i=0; i<array.length; i++)
        {
            listedBody.push(<li key={"A"+i}>{array[i]}</li>)
        }
        return(
            <ul className="myUL">
                {listedBody}
                <br/>
            </ul>
        );
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    
    GetAnswer= (answer) =>
    {
       this.props.SetAnswer(this.props.step,answer);
    }

    GetAnswerOverlayForm = () =>
    {
        return <AnswerManager cancelEdit={this.cancelEdit} getAnswer={this.GetAnswer}
        placeholder= {this.state.overlayed.extras.question} tempOptions={this.props.question}
        answerCount = {this.state.overlayed.extras.answerCount}/>;
    }

    render() { 
        let answerBody = this.GetListedBody(this.props.question.answer);
        let overlay = null;
        if(this.state.overlayed.overlay)
            overlay = this.GetAnswerOverlayForm();
        return (
            <div className="examStepQuestion">
                <p title={this.props.question.title} 
                className="MasterExamQuestion">
                    {(this.props.step+1)+". "+this.props.question.title}
                </p>
                <br/>
                <p title={this.props.question.answer}
                className="MasterExamAnswer"><span>Your answer:</span> </p>
                <br/>
                {answerBody}

                <button 
                    title={this.props.question.answerCount}
                    onClick = {this.handleEdit}>
                        Select Answer
                </button>
                {overlay}
            </div>
          );
    }
}
 
export default StepQuestion;