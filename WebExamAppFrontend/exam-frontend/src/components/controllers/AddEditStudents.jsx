import React, { Component } from 'react';
import MainPage from './UserController';
import StudentEditor from '../adminUIs/StudentEditor'

class AddEditStudents extends Component {
    state={
        user:null,
        student:null,
        new: false,
    }
    FetchStudent = () =>
    {
        fetch('http://localhost:51061/api/EditStudent')
        .then(result=>result.json())
        .then((data)=>{
            this.setState({student: data});
        })
        .catch((e)=>{
            this.setState({student: this.GetEmptyStudent()});
            this.setState({new:true});
        });
    }
    GetEmptyStudent =() =>
    {
        return {
            name: null,
            username: null,
            email: null,
            areas: [],
            subareas: []
        };
    }

    render() {
        let body = null;
        let role = '';
        let student= null;
        if(this.state.student==null)
            this.FetchStudent();
        student = this.state.student;
        if(this.state.user)
        {
            role = this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            if(!admin || this.state.student== null)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">Student editor</h1>
                <StudentEditor student={student} new={this.state.new}/>
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
 
export default AddEditStudents;