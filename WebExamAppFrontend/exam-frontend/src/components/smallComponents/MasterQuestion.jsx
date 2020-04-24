import React, { Component } from 'react';
import StepQuestion from './StepQuestion';
class MasterQuestion extends Component {
    state = 
    {
        currentStep: 1, // Default is Step 1
        markedQuestions: [],
        questions : this.props.exam.questions,
        fromDate: this.props.exam.fromDate,
        untilDate: this.props.exam.untilDate,
        subarea: this.props.exam.subarea,
    }
    
    SetAnswer = (id,answer) =>
    {
        let newQuestions = this.state.questions.slice();
        let newQuestion = newQuestions[id];
        newQuestion.answer = answer;
        newQuestions[id] = newQuestion;
        this.setState({questions:newQuestions});
    }
    
    submitStudentExam = (event)=>
    {
        event.preventDefault();
        let realExam = this.RefurbishExam(this.props.exam);
        console.log(realExam);
        return;
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
            //window.location.assign("/home");
        console.log(this.RefurbishExam(realExam));
    }
    RefurbishExam = (exam)=>
    {
        exam.examElements = exam.questions;
        return exam;
    }

      render()
      {
          return(
            <React.Fragment>
                <span className="questionCount">Question {this.state.currentStep}/{this.state.questions.length}</span>
                <br/>
                {this.prevButton}
                {this.nextButton}
                <br/>
                <br/>
                <StepQuestion 
                    step={(this.state.currentStep-1)}
                    SetAnswer = {this.SetAnswer}
                    question = {this.state.questions[this.state.currentStep-1]}
                />
                {this.markButton}
                <br/>

                
            </React.Fragment>
          );
      }
    changeStep = (forward) =>
    {
        let currentStep = this.state.currentStep
        if(forward)
        {
            currentStep = currentStep+1;
            if(currentStep>this.state.questions.length)
                currentStep = 1;
        }
        else
        {
            currentStep = currentStep-1;
            if(currentStep<1)
                currentStep = this.state.questions.length;
        }
        this.setState({
          currentStep: currentStep
        });
        this.forceUpdate();
    }

    get prevButton()
    {
        let currentStep = this.state.currentStep;
        if(currentStep!=1)
        {
            return(
                <button
                    className="prevStepButton"
                    onClick={()=>this.changeStep(false)}>
                    Previous Question
                </button>
            );
        }
        return null;
    }
    get nextButton()
    {
        let currentStep = this.state.currentStep;
        if(currentStep< this.state.questions.length)
        {
            return(
                <button
                    className="nextStepButton"
                    onClick={()=>this.changeStep(true)}>
                    Next Question
                </button>
            );
        }
        return (
            <button
                className="SubmitStExamButton"
                onClick={this.submitStudentExam}>
                Submit Exam
            </button>
        );
    }
    get markButton()
    {
        return(
            <button
                className="markStepButton"
                onClick={()=>this.registerQuestion()}>
                Mark Question
            </button>
        );
    }

}
 
export default MasterQuestion;