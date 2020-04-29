import React, { Component } from 'react';
import QuestionsManager from '../adminUIs/QuestionsManager';
import MainPage from './UserController';

class AddEditQuestions extends Component {
    state={
        user:null,
        questions: null,
    }
    constructor(props)
    {
        super(props);
        this.FetchQuestions();
    }
    FetchQuestions = () =>
    {
        let subAreaId = sessionStorage.getItem('CurrentSubArea');
        let context = this;
        fetch('http://localhost:51061/api/SubAreaQuestions/'+subAreaId)
        .then(result=>result.json())
        .then((data)=>{
            let realQuestions = context.RefurbishQuestions(data);
            context.setState({questions:realQuestions})
        })
        .catch((e)=>{
            this.setState({questions: []});
            this.setState({new:true});
        });
    }

    RefurbishQuestions = (questions) => 
    {
        console.log(questions);
        let realQuestions = questions;
        for(let i=0; i<questions.length; i++)
        {
            realQuestions[i].optionElement = 
            {
                type: questions[i].type,
                multiple: questions[i].multiple,
                options: questions[i].options,
                answer: questions[i].answer,
                questionId: questions[i].questionId
            }
        }
        return realQuestions;
    
    }

    render() {
        let body = null;
        let role = '';
        if(this.state.user)
        {
            role = this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            let teacher = this.state.user.role === "Teacher"? true:false;
            if((!admin && !teacher) || this.state.questions== null)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">Questions Editor</h1>
                <QuestionsManager questions= {this.state.questions}/>
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
 
export default AddEditQuestions;