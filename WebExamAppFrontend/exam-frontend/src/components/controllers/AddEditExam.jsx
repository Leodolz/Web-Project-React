import React, { Component } from 'react';
import NewExamList from '../adminUIs/ExamEditor';
import MainPage from './UserController';

class ExamEdit extends Component {
    state={
        user:null,
        exam: {
            title: '',
            listElements : [
                {}
            ],
            date: null,
            subarea: null
        }
    }

    render() {
        let body = null;
        let role = '';
        if(this.state.user)
        {
            role = this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            if(!admin)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">Exam editor</h1>
                <NewExamList/>
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