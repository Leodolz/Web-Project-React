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
        this.state.questions = this.FetchQuestions();
    }
    FetchQuestions = () =>
    {
        let questionsJson = sessionStorage.getItem('CurrentSubArea');
        let questions = [];
        if(questionsJson)
            questions = JSON.parse(questionsJson).questions;
        return questions;
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