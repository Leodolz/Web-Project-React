import React, { Component } from 'react';
import MainPage from './UserController';
import AreaEditor from '../adminUIs/AreaEditor';
class AddEditAreas extends Component {
    state={
        user:null,
        exam: {
            title: '',
            questions: [],
            answers: [],
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
                <h1 className="Editor">Area editor</h1>
                <AreaEditor/>
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
 
export default AddEditAreas;