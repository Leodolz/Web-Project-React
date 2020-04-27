import React, { Component } from 'react';
import StepQuestion from './StepQuestion';
class MasterQuestion extends Component {
    state = 
    {
        currentStep: 1, // Default is Step 1
        markedQuestions: [],
        hours: 2,
        minutes: 0,
        seconds: 0,
        questions : this.props.exam.questions,
        fromDate: this.props.exam.fromDate,
        untilDate: this.props.exam.untilDate,
        subarea: this.props.exam.subarea,
    }
    constructor(props)
    {
        super(props);
        this.StartTimer();
    }
    StartTimer = () =>
    {
        this.myInterval = setInterval(()=>
        {
            const{seconds,minutes,hours} = this.state;
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                  seconds: seconds - 1
                }))
              }
            if (seconds === 0) 
            {
                if (minutes === 0) 
                {
                    if(hours === 0)
                        clearInterval(this.myInterval);
                    else
                        this.setState(({ hours }) => ({
                            hours: hours - 1,
                            minutes: 59,
                            seconds: 59
                        }))                  
                }
                else   
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }));
            }
        },1000)
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
          const {hours,minutes,seconds} = this.state;
          let currentTimer =  <span className="examTimer">Time left: {hours}:{minutes<10?`0${minutes}`:minutes}:{seconds<10?`0${seconds}`:seconds}</span>;
          if(hours == 0 && minutes == 0 && seconds == 0)
            currentTimer = <span className="examTimer">Time's out!</span>
            //Replace for the action of submitting exam
          return(
            <React.Fragment>
                <span className="questionCount">Question {this.state.currentStep}/{this.state.questions.length}</span>
                {currentTimer}
                <br/>
                <br/>
                <StepQuestion 
                    step={(this.state.currentStep-1)}
                    SetAnswer = {this.SetAnswer}
                    question = {this.state.questions[this.state.currentStep-1]}
                />
                {this.markButton}
                <br/>
                {this.prevButton}
                {this.nextButton}
                
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