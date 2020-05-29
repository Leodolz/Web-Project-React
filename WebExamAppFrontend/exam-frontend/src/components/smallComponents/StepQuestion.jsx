import React, { Component } from 'react';
import AnswerManager from './AnswerManager';
import ImagePreview from './ImagePreview';
import ImageUploader from './ImageUploader';

class StepQuestion extends Component {
    state = {
        step: this.props.step,
        question: this.props.question,
        overlayed : 
        {
            overlay: false,
            extras : null,
        },
        changedStep: this.props.changedStep,
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
        //this.props.SetAnswer(this.props.step,[]);
        this.setState({overlayed:
        {
            overlay: true,
            extras:extras,
        }});
    }

    GetListedBody(array)
    {
        if(array == null)
            array = [];
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

    componentDidUpdate =() =>
    {
        if(this.props.changedStep)
            this.setState({question: this.props.question});
    }
    renderOptions = (optionsArray) =>
    {
        let elements = [];
        
        for(let i=0; i<optionsArray.length; i++)
        {
            let imagePreview =  <ImagePreview  
                        option="option"
                        contextId={optionsArray[i].optionId}/>;
            elements.push(
                <React.Fragment key={"OPI"+i}>
                    <li key={"OP"+i}>
                        <React.Fragment key ={"OPImage"+i}>
                        {optionsArray[i].title}
                        <br/>
                        {imagePreview}
                        </React.Fragment>
                    </li>
                </React.Fragment>
            )
        }
        return elements;
    }

    GetAnswerOverlayForm = () =>
    {
        return <AnswerManager cancelEdit={this.cancelEdit} getAnswer={this.GetAnswer}
        placeholder= {this.state.overlayed.extras.question} tempOptions={this.props.question}
        answerCount = {this.state.overlayed.extras.answerCount} preDefAnswer = {this.props.question.answer}/>;
    }

    render() { 
        let currentOptions = this.renderOptions(this.state.question.options);
        if(this.props.changedStep)
        {
            currentOptions = null;   
        }
        
        let question = this.state.question;
        let answerBody = this.GetListedBody(question.answer);
        let overlay = null;
        if(this.state.overlayed.overlay)
            overlay = this.GetAnswerOverlayForm();
        return (
            <div className="examStepQuestion">
                <p title={this.props.question.title} 
                className="MasterExamQuestion">
                    {(this.props.step+1)+". "+question.title}
                </p>
                {this.props.image}
                <br/>
                <p>Options:</p>
                <ul className="myUL">
                {currentOptions}
                </ul>
                <br/>
                <p title={question.answer}
                className="MasterExamAnswer"><span>Your answer:</span> </p>
                <br/>
                
                {answerBody}
                <button 
                    title={question.answerCount}
                    onClick = {this.handleEdit}>
                        Select Answer
                </button>
                {overlay}
            </div>
          );
    }
}
 
export default StepQuestion;