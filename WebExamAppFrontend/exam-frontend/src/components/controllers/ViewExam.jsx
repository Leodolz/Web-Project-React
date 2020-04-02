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
                    studentAnswer: "Almost First",
                    answer: "First Answer",
                    score: 23
                },
                {
                    title: "Second Question",
                    studentAnswer: "Second Answer",
                    answer: "Second Answer",
                    score: 60
                },
            ],
            date: "4/1/2020",
            subarea: "Geometry",
            score: 83
        }
        return exam;
    }
}
 
export default ViewExam;