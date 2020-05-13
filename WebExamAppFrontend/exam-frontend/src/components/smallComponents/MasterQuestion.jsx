import React, { Component } from 'react';
import StepQuestion from './StepQuestion';
import CustomTimer from './CustomTimer';
import ImageUploader from './ImageUploader';
class MasterQuestion extends Component {
    state = 
    {
        currentStep: 1, // Default is Step 1
        markedQuestions: [],
        hours: this.props.hours,
        minutes: this.props.minutes,
        seconds: this.props.seconds,
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
        changedStep: false,
    }

    
    constructor(props)
    {
        super(props);
        let quest = localStorage.getItem('CurrentQuestions');
        let marked = localStorage.getItem('MarkedQuestions');
        if(quest!=null)
        {
            let questionsObj = JSON.parse(quest);
            this.state.questions = this.SetAllAnswers(questionsObj.answers);
            if(marked!=null)
            {
                let markedQuestionsObj = JSON.parse(marked);
                this.state.markedQuestions = markedQuestionsObj.questions;
            }
        }
        else
        {
            this.state.overlayed.overlay = true;
            sessionStorage.setItem('SubmitedExam',"");
        }
        

    }
    
    componentWillMount()
    {
        onbeforeunload = e => {
            let context = this;
            if(sessionStorage.getItem('SubmitedExam') == "true")
                return;
            let answers = this.GetAllAnswers();
            localStorage.setItem('CurrentQuestions',JSON.stringify({
                answers: answers,
            }));
            localStorage.setItem('MarkedQuestions',JSON.stringify({
                questions: context.state.markedQuestions,
            }));
            return;
        }
    }
    componentDidUpate()
    {
        
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
        let questions = this.props.exam.questions.slice();
        for(let i =0; i<questions.length;i++)
        {
            questions[i].answer = answers[i];
        }
        return questions;
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
    GetMarkedQuestions =()=>
    {
        let markedList = this.GetMarkedList();
        return (
            <div className="overlayedHome">
                <h1 className="whiteTitle">Marked Questions: </h1>
                <ul className="myUL">
                    {markedList}
                </ul>
                <button onClick={()=>this.setState({overlayed:
                {
                    overlay: false,
                    formType: "",
                }})}>OK</button>
            </div>
        );
    }
    GoToQuestion =(event)=>
    {
        event.preventDefault();
        this.setState({currentStep: event.target.title});
        this.setState({overlayed: {
            overlay: false,
            formType: "",
        }})
    }
    GetMarkedList = () =>
    {
        let list = this.state.markedQuestions.slice();
        let itemList = [];
        for(let i=0; i<list.length; i++)
        {
            itemList.push(<li title = {list[i]} key = {"MQ"+i}
            onClick={this.GoToQuestion}>{list[i]}. {this.state.questions[list[i]-1].title}</li>);
        }
        return itemList;
    }
    SetAnswer = (id,answer) =>
    {
        let newQuestions = this.state.questions.slice();
        let newQuestion = newQuestions[id];
        newQuestion.answer = answer;
        newQuestions[id] = newQuestion;
        this.setState({questions:newQuestions});
    }
    
    submitStudentExam = ()=>
    {
        
        let realExam = this.RefurbishExam(this.props.exam);
        sessionStorage.setItem('SubmitedExam','true')
        localStorage.removeItem('CurrentQuestions');
        localStorage.removeItem('MarkedQuestions');
        let doneExams = localStorage.getItem('DoneExams');
        if(doneExams==null)
        {
            doneExams = [];
        }
        else doneExams = doneExams.split(",");
        doneExams.push(this.props.exam.Id);
        localStorage.setItem('DoneExams',doneExams.join(','));
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
    }
    RefurbishExam = (exam)=>
    {
        exam.examElements = exam.questions;
        return exam;
    }
    stopTimer = () =>
    {
        this.submitStudentExam();
    }
    refreshStep = () =>
    {
        this.setState({changedStep: false});
    }

    render()
    {
        let overlay = this.GetOverlayForm();
        console.log("rendered!");
        const {hours,minutes,seconds} = this.state;
        let currentTimer = <CustomTimer hours={hours} minutes={minutes} seconds={seconds} stopTimer={this.stopTimer}/>
        let image =(
            <ImageUploader 
            viewMode={true} 
            reloadAccordions ={()=>{console.log("reloading")}} 
            option="question"
            contextId={this.state.questions[this.state.currentStep-1].questionId}
            />
        );
        if(this.state.changedStep)
        {
            image = null;
        }
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
                    changedStep = {this.state.changedStep}
                    refreshStep = {this.refreshStep}
                    image = {image}
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
          currentStep: currentStep,
          changedStep: true,
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
            <>
                <button
                    className="SubmitStExamButton"
                    onClick={this.submitStudentExam}>
                    Submit Exam
                </button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {this.viewMarksButton}
            </>
            
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
    get viewMarksButton()
    {
        return (
            <button
            className= "ViewMarkedExamButton"
                onClick={()=>this.setState({overlayed:
                {
                    overlay: true,
                    extras: null,
                    formType: "MarkedQuestions"
                }})}>
                View Marked Questions
            </button>
        )
    }
    registerQuestion = () =>
    {
        let marked = this.state.markedQuestions.slice();
        if(!this.state.markedQuestions.find(item=>item == this.state.currentStep))
        {
            marked = this.state.markedQuestions.slice();
            marked.push(this.state.currentStep);
        }
        else
        {
            marked = this.state.markedQuestions.slice();
            marked = marked.filter((value,index,arr)=>value!= this.state.currentStep);
        }
        this.setState({markedQuestions: marked})
    }

}
 
export default MasterQuestion;