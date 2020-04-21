import React, { Component } from 'react';
import AnswerManager from '../smallComponents/AnswerManager';
class StudentExamTaker extends Component {
    state = {
        questions : this.props.exam.questions,
        fromDate: this.props.exam.fromDate,
        untilDate: this.props.exam.untilDate,
        subarea: this.props.exam.subarea,
        overlayed : 
        {
            overlay: false,
            extras : null,
            formType: "Text",
        },
        answeringId: 0,
      }

    renderList = () => 
    {
        
        let list = [];
        for(let i=0;i<this.state.questions.length;i++)
        {
            let listElement = (
            <div key={i}>
                <li className="ExamQuestion" title={this.state.questions[i].title} key={"Q"+i}><span className="etag">{(i+1)+". "}</span>{this.state.questions[i].title}</li> 
                <li id={i} title={this.state.questions[i].answer} className="StudentAnswer" key={"SA"+i}>
                <span className="etag">Your Answer: </span> 
                {this.state.questions[i].answer.join(", ")}
                <button  onClick= {this.handleEdit} className="editAnswerStudent">Edit</button>
                </li> 
            </div> 
            )
            list.push(listElement);
        }
        return list;
    }
    submitStudentExam = (event)=>
    {
        event.preventDefault();
        let realExam = this.RefurbishExam(this.props.exam);
        
        fetch('http://localhost:51061/api/StudentExam?code=submit',
            {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: realExam.Id,
                    title: realExam.title,
                    fromDate: realExam.fromDate,
                    subAreaId: realExam.subAreaId,
                    untilDate: realExam.untilDate,
                    examElements: realExam.examElements,
                    studentId: this.props.studentId
                })
            }).catch((e)=>{alert("Error, couldn't add or edit student")});
            alert("Changes Succesfully done");
            window.location.assign("/home");
        console.log(this.RefurbishExam(realExam));
    }
    RefurbishExam = (exam)=>
    {
        exam.examElements = exam.questions;
        return exam;
    }
    handleEdit = (event) =>
    {
        event.preventDefault();
        let extras = {
            id: event.target.parentElement.id,
            value: event.target.parentElement.title,
            question: event.target.parentElement.previousElementSibling.title,
            placeholder: "Your Answser",
        }
        this.SetAnswer( event.target.parentElement.id,[""]);
        this.setState({overlayed:
        {
            overlay: true,
            extras:extras,
        }});
    }

    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    GetAnswerOverlayForm = () =>
    {
        return <AnswerManager cancelEdit={this.cancelEdit} getAnswer={this.GetAnswer}
        placeholder= {this.state.overlayed.extras.question} tempOptions={this.state.questions[this.state.overlayed.extras.id]}/>;
    }
    SetAnswer = (id,answer) =>
    {
        let newQuestions = this.state.questions.slice();
        let newQuestion = newQuestions[id];
        newQuestion.answer = answer;
        newQuestions[id] = newQuestion;
        this.setState({questions:newQuestions});
    }

    GetAnswer= (answer) =>
    {
       this.SetAnswer(this.state.overlayed.extras.id,answer);
    }

    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            return this.GetAnswerOverlayForm();
        }
        else return null;
    }

    render() {  
        let overlay = this.GetOverlayForm();
        return (
            <React.Fragment>
                <h3 title={this.state.fromDate}>Date From: {this.state.fromDate}</h3>
                <h3 title={this.state.untilDate}>Date Until: {this.state.untilDate}</h3>
                <h3 className="SubAreaEdit" title= {this.state.subarea}>Sub-Area Assigned: {this.state.subarea} </h3>
                <ul className="myUL">
                    {this.renderList()}
                    <br/>
                </ul>
                <button onClick={this.submitStudentExam}>Submit Exam</button>
                {overlay}

            </React.Fragment>
          );
    }
    submitExam = () =>
    {
        let exam = this.props.exam;
        exam.examElements = this.state.questions;
        console.log(exam);
    }



}
 
export default StudentExamTaker;