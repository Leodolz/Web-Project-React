import React, { Component } from 'react';
import MainPage from './UserController';
import StudentExamTaker from '../studentUIs/StudentExamTaker';

class TakeExam extends Component {
    state={
        user:null,
        exam: {
            title: '',
            questions: [],
            date: null,
            subarea: null,
            score: 0
        }
    }

    render() {
        let body = null;
        let role = '';
        if(this.state.user)
        {
            let exam = this.GetExam();
            role = this.state.user.role;
            let admin = this.state.user.role === "Student"? true:false; 
            if(!admin)
                body= (<h1><a href='/'>You need Student Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">{exam.title}</h1>
                <StudentExamTaker exam={exam}/>
                </React.Fragment>
            );
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
    GetExam = ()=>
    {
        //Fetch for exam
         /*
    questions = {
        options: [],
        answers: [],
        multiple: true,false
    }
    */
        let exam= {
            title: 'Generic Exam',
            questions: [
                {
                    title: "First Question",
                    options: ["A","B","C","D"],
                    answer: [],
                    multiple: true
                },
                {
                    title: "Second Question",
                    options: ["True","False"],
                    answer: [],
                    multiple: false
                },
                {
                    title: "Third Question",
                    options: ["x=5","x=18","x=11","None"],
                    answer: [],
                    multiple: false
                }
            ],
            date: "4/2/2020",
            subarea: "Geometry",
            score: 0
        }
        return exam;
    }
}
 
export default TakeExam;