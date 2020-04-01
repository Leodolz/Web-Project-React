import React, { Component } from 'react';
import MainPage from './UserController';
import StudentEditor from '../adminUIs/StudentEditor'

class AddEditStudents extends Component {
    state={
        user:null,
        exam: {
            studentList: []
        }
    }
    GetStudent = () =>
    {
        return {
            name: "Leandro",
            username: "leodolz",
            email: "Leo123@somemail.com",
            areas: ["Math", "History"],
            subareas: ["Geometry","Algebra","World History"]
        };
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
        let student= this.GetStudent();
        if(this.state.user)
        {
            role = this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            if(!admin)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">Student editor</h1>
                <StudentEditor student={student}/>
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