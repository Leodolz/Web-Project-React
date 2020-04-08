import React, { Component } from 'react';
import MainPage from './UserController';
import StudentEditor from '../adminUIs/StudentEditor'

class AddEditTeachers extends Component {
    state={
        user:null,
    }
    GetTeacher = () =>
    {
        return {
            name: "John Monei",
            username: "Johnny_23",
            email: "JM23@gmail.com",
            areas: ["Math", "History"],
            subareas: ["Geometry","Algebra","World History"]
        };
    }
    GetEmptyTeacher =() =>
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
        let teacher= this.GetTeacher();
        if(this.state.user)
        {
            role = this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            if(!admin)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">Teacher editor</h1>
                <TeacherEditor teacher={teacher}/>
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
 
export default AddEditTeachers;