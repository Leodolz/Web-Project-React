import React, { Component } from 'react';
import MainPage from './UserController';
import StudentExamTaker from '../studentUIs/StudentExamTaker';
import MasterQuestion from '../smallComponents/MasterQuestion';

class TakeExam extends Component {
    state={
        user:null,
        exam: null,
    }
    constructor(props)
    {
        super(props);
        document.title= "Student exam";
        this.FetchExam();
    }

    render() {
        let body = null;
        let role = '';
        if(this.state.user)
        {
            let exam = this.state.exam;
            role = this.state.user.role;
            let admin = this.state.user.role === "Student"? true:false; 
            if(!admin)
                body= (<h1><a href='/'>You need Student Permisions to be here</a></h1>);
            else if(this.state.exam==null) 
                body= (
                    <React.Fragment>
                        <h1>Loading Exam...</h1>
                        <h1><a href='/ExamStudent'>If it takes too much click here</a></h1>
                    </React.Fragment>
                );
            else
            {
                let doneExams = sessionStorage.getItem('DoneExams');
                if(doneExams!=null)
                {
                    if(doneExams.split(",").find(examItem=>examItem == exam.Id))
                    {
                        body=(
                        <>
                            <h1>You have already done this exam</h1>
                        </>);
                    }
                }
                else
                {
                let today = new Date();
                let examTime = new Date(exam.untilDate);
                let expTime = examTime- today;
                expTime = expTime/1000;
                let hours = Math.floor(expTime/3600);
                let minutes = Math.floor(expTime/60);
                let seconds = Math.floor((expTime-(hours*3600)-(minutes*60)));
                body = (
                    <React.Fragment >
                    <h1 className="Editor">{exam.title}</h1>
                    <MasterQuestion studentId={this.state.user.Id} exam={exam} hours={hours} minutes= {minutes} seconds={seconds}/>
                    </React.Fragment>
                );
                }
            }
            //<StudentExamTaker studentId={this.state.user.Id} exam={exam}/>
            //<MasterQuestion studentId={this.state.user.Id} exam={exam}/>
        }
        return (
            <React.Fragment>
            <MainPage role={role} body={body} home="active" GetUser={this.GetUser}/>
            </React.Fragment>
          );
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
    }
    FetchExam = () =>
    {
        fetch('http://localhost:51061/api/StudentExam')
        .then(result=>result.json())
        .then((data)=>{
            let exam = this.RefurbishExam(data);
            this.setState({exam: exam});
        })
        .catch((e)=>{

        });
    }
    
    RefurbishExam = (exam)=>
    {
        exam.questions = exam.examElements;
        return exam;
    }
    
}
 
export default TakeExam;