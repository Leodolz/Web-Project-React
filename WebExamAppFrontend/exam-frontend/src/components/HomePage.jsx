import React, { Component } from 'react';
import MainPage from './UserController';
import Accordion from './Accordion';

class Home extends Component {
    state={user:null}

    render() {
        let body = null;
        let role = '';
        if(this.state.user)
        {
            console.log(this.state.user);
            role= this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            body = (
                <React.Fragment>
                <h1>Welcome {this.state.user.name}</h1>
                <Accordion admin={admin}/>
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
 
export default Home;