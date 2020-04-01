import React, { Component } from 'react';
import MainPage from './UserController';
import SubAreaEditor from '../SubAreaEditor';

class AddEditSubAreas extends Component {
    state={
        user:null,
        exam: {
            title: '',
            questions: [],
            answers: [],
        }
    }

    GetAdminStudentsTable = ()=>
    {
        return(
            [
                {
                    name: "Leandro Hurtado",
                    username: "leodolz",
                    email: "leo123f@somemail.com",
                    areas: "Math, History",
                    subareas: "Algebra, World History, Geometry",
                },
                
                {
                    name: "Another Student",
                    username: "genericStudent",
                    email: "gen324@somemail.com",
                    areas: "Math",
                    subareas: "Algebra, Geometry",
                },
            ]
        );
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
                <h1 className="Editor">Sub-Area editor</h1>
                <SubAreaEditor/>
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
 
export default AddEditSubAreas;