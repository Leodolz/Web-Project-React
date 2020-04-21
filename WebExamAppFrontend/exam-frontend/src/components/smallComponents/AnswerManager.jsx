import React, { Component } from 'react';
import CustomCheckBoxes from '../smallComponents/CustomCheckBoxes';
import CustomRadioButtons from '../smallComponents/CustomRadioButtons';

class AnswerManager extends Component {
    state = { 
        answer: [],
     }
    constructor(props)
    {
        super(props);
        if(this.props.preDefAnswer)
        {
            this.state.answer= this.props.preDefAnswer;
        }
    }
    handleCheckAnswer = (event) =>
    {
        this.registerNewAnswer(event,true);
    }
    handleChangeRadioAnswer = (event) =>
    {
        this.registerNewAnswer(event,false);
    }
    registerNewAnswer = (event,multiple) =>
    {
        let newAnswers = this.state.answer;
        if(multiple)
        {
            if(event.target.checked)
            {
                if(this.props.answerCount == this.state.answer.length)
                {
                    alert("Only "+this.props.answerCount+" admitted for this answer");
                    event.target.checked = false;
                    return;
                }
                let answer = event.target.value;
                newAnswers.push(answer);
            }
            else
            {
                newAnswers = newAnswers.filter((value,index,arr)=>value!=event.target.value);
            }
        }
        else
        {
            if(event.target.checked)
            {
                newAnswers = [event.target.value];
            }
        }
       this.setState({answer:newAnswers});
    }

    cancelEdit = (event) =>
    {
        this.props.getAnswer(this.state.answer);
        this.props.cancelEdit();
    }

    render() { 
        let currentOptions = this.props.tempOptions.options;
        let checkBoxInputs = null;
        if(this.props.tempOptions.multiple)
        {
            let currentAnswers  = this.props.tempOptions.answer;
            checkBoxInputs = (<CustomCheckBoxes handleCheckAnswer = {this.handleCheckAnswer} answers ={currentAnswers} generalArray={currentOptions}/>);
        }
        else
        {
            let currentAnswer  = this.props.tempOptions.answer[0];
            checkBoxInputs = (<CustomRadioButtons handleChangeRadioAnswer = {this.handleChangeRadioAnswer} answer = {currentAnswer} generalArray={currentOptions} />);
        }
        return (
            <div className="overlayed">
                <form className = "elementEditForm" onSubmit={this.editAreas} >
                    <h3>{this.props.placeholder+": "}</h3>
                    <hr/>
                    {checkBoxInputs}
                    <button type="button" onClick= {this.cancelEdit}>Finish</button>
                </form>
            </div>
        );
    }
}
 
export default AnswerManager;