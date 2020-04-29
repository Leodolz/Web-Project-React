import React, { Component } from 'react';
import QuestionEditor from '../smallComponents/QuestionEditor';
import QuestionsViewer from '../smallComponents/QuestionsViewer';

class QuestionsManager extends Component {
    state = {
        questions: this.props.questions,
        overlayed : {
            overlay: false,
            extras : null,
            type: "Date",
        },
      }

    getNewQuestion = (newQuestion) =>
    {
        let newList = this.state.questions;
        newList.push(newQuestion);
        this.setState({questions:newList});
    }
    findItemsInArray = (currentArray,generalArray) =>
    {
        for(let i=0;i<currentArray.length;i++)
        {
            if(generalArray.find(item=>item==currentArray[i])!=null)
            {
                return true;
            }
        }
        return false;
    }

    editQuestion = (event) =>
    {
        event.preventDefault();
        let element = this.state.questions[event.target.parentElement.id];
        let preDefValue = 
        {
            optionElement: element.optionElement,
            title: element.title,
            score: element.score,
            questionId: element.questionId
        };
        let extras = {
            placeholder: "Question Editor",
            value: preDefValue,
            type: "Question"
        }
        this.setState({editingId:event.target.parentElement.id});
        this.setState({overlayed: {
            overlay: true,
            extras:extras
        }});
    }

    getEditedQuestion = (newQuestion) =>
    {
        let newList = this.state.questions;
        newList[this.state.editingId] = newQuestion;
        this.setState({questions:newList});
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }});
    }
    

    DeleteComponentInArray = (event,array)=>
    {
        let elementId = event.target.parentElement.id;
        let newarray = array;
        return newarray.filter((value,index)=>{ return index!=elementId});
    }
    DeleteQuestion = (event) =>
    {
        let array = this.state.questions.slice();
        array = this.DeleteComponentInArray(event,array);
        this.setState({questions:array});
    }
    GetOverlayedForm = () => 
    {
        if(this.state.overlayed.overlay)
        {
            switch(this.state.overlayed.extras.type)
            {
                case "Sub-Area":
                    return this.GetSubAreasOverlayForm();
                case "Date":
                    return this.GetDateOverlayForm();
                case "Title":
                    return this.GetTitleOverlayForm();
                default:
                    return this.GetQuestionOverlayForm();
            }   
        }
        else return null;
    }
    GetQuestionOverlayForm = () =>
    {
        let extras = this.state.overlayed.extras;
        return (
            <div className="overlayedHome">
                <QuestionEditor getNewQuestion={this.getNewQuestion}  findItemsInArray={this.findItemsInArray} DeleteComponentInArray={this.DeleteComponentInArray}
                preDefQuestion={extras.value} editing={true} getEditedQuestion={this.getEditedQuestion}/>
            </div>
            );
    }

    render() { 
        let overlay = this.GetOverlayedForm();
        return (
            <>
                <QuestionEditor getNewQuestion={this.getNewQuestion}  findItemsInArray={this.findItemsInArray} DeleteComponentInArray={this.DeleteComponentInArray}/>
                <QuestionsViewer questions = {this.state.questions} editQuestion = {this.editQuestion} hideComponent={this.DeleteQuestion}/>
                {overlay}
            </>
          );
    }
}
 
export default QuestionsManager;