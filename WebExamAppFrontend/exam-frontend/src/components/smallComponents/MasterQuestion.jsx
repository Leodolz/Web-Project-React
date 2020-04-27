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
        submited: false,
        questions : this.props.exam.questions,
        fromDate: this.props.exam.fromDate,
        untilDate: this.props.exam.untilDate,
        subarea: this.props.exam.subarea,
        overlayed : 
        {
            overlay: false,
            extras : null,
            formType: "Start",
        },
    }
    constructor(props)
    {
        super(props);
        
        let time = sessionStorage.getItem('CurrentTime');
        let quest = sessionStorage.getItem('CurrentQuestions');
        if(time!=null && quest!=null)
        {
            let timeObj = JSON.parse(time);
            let questionsObj = JSON.parse(quest);
            this.state.hours = timeObj.hours;
            this.state.minutes = timeObj.minutes;
            this.state.seconds = timeObj.seconds;
            this.state.questions = this.SetAllAnswers(questionsObj.answers);
            this.StartTimer();
        }
        else
            this.state.overlayed.overlay = true;
    }
    componentWillMount()
    {
        onbeforeunload = e => {
            let context = this;
            if(this.state.submited)
                return;
            sessionStorage.setItem('CurrentTime',JSON.stringify({
                hours: context.state.hours,
                minutes: context.state.minutes,
                seconds: context.state.seconds
            }));
            let answers = this.GetAllAnswers();
            sessionStorage.setItem('CurrentQuestions',JSON.stringify({
                answers: answers,
            }));
            return;
        }
    }
    componentWillUnmount()
    {
        onbeforeunload = null;
    }
    GetAllAnswers()
    {
        let answers =[];
        for(let i =0; i<this.state.questions.length;i++)
        {
            answers.push(this.state.questions[i].answer);
        }
        return answers;
    }
    SetAllAnswers = (answers) =>
    {
        let questions = this.state.questions.slice();
        for(let i =0; i<questions.length;i++)
        {
            questions[i].answer = answers[i];
        }
        return questions;
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
            else 
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
        },1000);
    }
    GetStartOverlayForm = () =>
    {
        const {hours,minutes,seconds} = this.state;
        return (
            <div className="overlayedHome">
                <div className="whiteTitle">
                    <h3>Student Aknowledgement</h3>
                    <h4>Read this before entering the exam: </h4>
                </div>
                <div className= "whiteText">
                    <p>By Clicking "I Agree" you aknowledge the following: </p>
                    <ul>
                        <li>This exam has a timer of {hours}:{minutes}:{seconds+" "}  
                        when countdown reaches 0, the exam will be delivered with 
                        the current student answers of that time</li>
                        <li>This exam can only be taken ONCE so the score the student
                            gets after being evaluated will be irrevocable
                        </li>
                    </ul>
                    <button onClick={()=>
                    {
                        this.setState({overlayed:
                        {
                            overlay: false,
                            extras : null,
                            formType: "MarkedQuestions",
                        }});
                        this.StartTimer();
                    }
                    }>I Agree</button>
                </div>
            </div>
        );
    }
    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            switch(this.state.overlayed.formType)
            {
                case "Start":
                    return this.GetStartOverlayForm();
                case "MarkedQuestions":
                    return this.GetMarkedQuestions();
                default:
                    return null;
            }
           
        }
        else return null;
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
        sessionStorage.removeItem('CurrentTime');
        sessionStorage.removeItem('CurrentQuestions');
        this.setState({submited: true});
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
          let overlay = this.GetOverlayForm();
          const {hours,minutes,seconds} = this.state;
          let currentTimer =  <span className="examTimer">Time left: {hours}:{minutes<10?`0${minutes}`:minutes}:{seconds<10?`0${seconds}`:seconds}</span>;
          if(hours == 0 && minutes == 0 && seconds == 0)
          {
            sessionStorage.setItem('CurrentTime',null);
            currentTimer = <span className="examTimer">Time's out!</span>
          }
            //Replace for the action of submitting exam
          return(
            <>
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
                {overlay}
                
            </>
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