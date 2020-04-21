import React, { Component } from 'react';
import MainPage from './UserController';
import StudentExamViewer from '../studentUIs/StudentExamViewer';
class ViewExam extends Component {
    state={
        user:null,
        exam: null,
    }
    constructor(props)
    {
        super(props);
        this.FetchExam();
    }

    render() {
        console.log(this.state.exam);
        let body = null;
        let role = '';
        if(this.state.user)
        {
            let exam = this.state.exam
            role = this.state.user.role;
            let admin = this.state.user.role === "Student"? true:false; 
            if(!admin)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else if(exam==null) 
                body= (
                <React.Fragment>
                    <h1>Loading Exam...</h1>
                    <h1><a href='/ExamStudent'>If it takes too much click here</a></h1>
                </React.Fragment>
                );
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
    FetchExam = () =>
    {
        fetch('http://localhost:51061/api/StudentExam/')
        .then(result=>result.json())
        .then((data)=>{
            let exam = this.RefurbishExam(data);
            this.setState({exam: exam});
        })
        .catch((e)=>{
            alert("Could not load exam, returning home screen...");
            window.location.assign('./home');
        });
    }
    
    RefurbishExam = (exam)=>
    {
        exam.listElements = exam.examElements;
        return exam;
    }

    
}
 
export default ViewExam;