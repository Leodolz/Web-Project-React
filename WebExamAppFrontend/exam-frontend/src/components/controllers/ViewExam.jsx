import React, { Component } from 'react';
import MainPage from './UserController';
import StudentExamViewer from '../studentUIs/StudentExamViewer';
class ViewExam extends Component {
    state={
        user:null,
        exam: {
            title: '',
            listElements: [{}],
            //questions: [],
            //answers: [],
            //scores: [],
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
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">{exam.title}</h1>
                <StudentExamViewer exam={exam}/>
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
        let exam= {
            title: 'Generic Exam',
            listElements: [
                {
                    title: "First Question",
                    studentAnswer: ["A","B"],
                    answer: ["A","C"],
                    studentScore: 20,
                    score: 40
                },
                {
                    title: "Second Question",
                    studentAnswer: ["True"],
                    answer: ["True"],
                    studentScore: 30,
                    score: 30
                },
                {
                    title: "Third Question",
                    studentAnswer: ["None"],
                    answer: ["x=11"],
                    studentScore: 0,
                    score: 30
                },
            ],
            date: "4/1/2020",
            subarea: "Geometry",
            score: 50
        }
        return exam;
    }
}
 
export default ViewExam;