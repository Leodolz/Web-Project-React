import React, { Component } from 'react';
import ExamEditor from '../adminUIs/ExamEditor';
import MainPage from './UserController';

class ExamEdit extends Component {
    state={
        user:null,
        exam: null,
        new: false,
    }
    constructor(props)
    {
        super(props);
        this.FetchExam();
    }

    GetEmptyExam = () =>
    {
        return {
            title: '',
            fromDate: '',
            untilDate: '',
            subarea: '',
            subAreaId: 0,
            examElements: [],
        }
    }
    FetchExam = () =>
    {
        fetch('http://localhost:51061/api/EditExam')
        .then(result=>result.json())
        .then((data)=>{
            this.setState({exam: data});
        })
        .catch((e)=>{
            this.setState({exam: this.GetEmptyExam()});
            this.setState({new:true});
        });
    }
    
    RefurbishExam = (exam)=>
    {
        console.log(exam);
        exam.RealExamQuestion = [];
        for(let i=0; i<exam.examElements.length; i++)
        {
            exam.RealExamQuestion[i] = exam.examElements[i];
            exam.RealExamQuestion[i].optionElement = 
            {
                type: exam.examElements[i].type,
                multiple: exam.examElements[i].multiple,
                options: exam.examElements[i].options,
                answer: exam.examElements[i].answer
            }
        }
        return exam;
    }

    render() {
        let body = null;
        let role = '';
        //let exam = this.GetSampleExam();
        //exam = this.RefurbishExam(exam);
        if(this.state.user)
        {
            role = this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            if(!admin || this.state.exam == null)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">Exam editor</h1>
                <ExamEditor exam = {this.RefurbishExam(this.state.exam)} new = {this.state.new} userId={this.state.user.Id}/>
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
}
 
export default ExamEdit;