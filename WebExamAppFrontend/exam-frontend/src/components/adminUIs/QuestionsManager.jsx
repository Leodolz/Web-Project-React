import React, { Component } from 'react';
import QuestionEditor from '../smallComponents/QuestionEditor';
import QuestionsViewer from '../smallComponents/QuestionsViewer';

class QuestionsManager extends Component {
    state = {
        questions: this.props.questions,
        overlayed : {
            overlay: false,
            extras : null
        },
        subAreaId: this.props.subAreaId
      }


    SaveChanges = () =>
    {
        let realExamQuestions = this.RefurbishQuestions();
        let edit = 'true';
        if(this.props.new)
            edit='false';
        fetch('http://localhost:51061/api/SubAreaQuestions?edit='+edit+"&subAreaId="+this.state.subAreaId,
            {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(realExamQuestions),
            }).catch((e)=>{alert("Error, couldn't add or edit Questions ")});
            alert("Changes Succesfully done");
            window.location.assign("/home");
    }

    RefurbishQuestions = ()=>
    {
        let questions = this.state.questions;
        for(let i=0; i<questions.length; i++)
        {
            questions[i].type =  questions[i].optionElement.multiple?"Multiple":"Single";
            questions[i].multiple =  questions[i].optionElement.multiple;
            questions[i].options =  questions[i].optionElement.options;
            questions[i].answer =  questions[i].optionElement.answer;
            let questionId =  questions[i].optionElement.questionId;
            if(questionId == undefined)
                questionId = 0;
            questions[i].questionId = questionId;
        }
        return questions;
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
        }
        this.setState({editingId:event.target.parentElement.id});
        this.setState({overlayed: {
            overlay: true,
            extras:extras
        }});
    }

    getEditedQuestion = (newQuestion) =>
    {
        if(window.confirm("Are you sure you want to edit this question?"))
        {
            let newList = this.state.questions;
            newList[this.state.editingId] = newQuestion;
            this.setState({
                questions:newList,
                overlayed: 
                {
                    overlay: false,
                    extras:null
                }
            });
        }
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
            return this.GetQuestionOverlayForm(); 
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
                <button onClick={()=>{
                    this.setState({
                        overlayed: 
                        {
                            overlay: false,
                            extras:null
                        }
                    })
                    }}>Cancel</button>
            </div>
            );
    }

    
    render() { 
        let overlay = this.GetOverlayedForm();
        return (
            <>
                <QuestionEditor getNewQuestion={this.getNewQuestion}  findItemsInArray={this.findItemsInArray} DeleteComponentInArray={this.DeleteComponentInArray}/>
                <QuestionsViewer questions = {this.state.questions} editQuestion = {this.editQuestion} hideComponent={this.DeleteQuestion}/>
                <button onClick={()=>this.SaveChanges()}>Save Changes</button>
                {overlay}
            </>
          );
    }
}
 
export default QuestionsManager;