import React, { Component } from 'react';
import ResponsiveNavBar from '../ResponsiveNavBar';

 class MainPage extends Component{

    state = {
        user: JSON.parse(sessionStorage.getItem('User')),
       };
  constructor(props)
    {
        super(props);
        this.props.GetUser(this.state.user);
    }


    logOff = () =>
    {
        sessionStorage.setItem('User',null);
    }

    render() { 
        let menu = <h1> <a href="/">You need to autenticate</a></h1>;
        if(this.state.user)
        {
            menu = (
            <React.Fragment>
             <ResponsiveNavBar 
              name = {this.state.user.full_name}
              role = {this.props.role}
              onLogout={this.logOff} 
              home= {this.props.home}
              news= {this.props.news}
              contact= {this.props.contact}
              about= {this.props.about}
              username={this.state.user.username} />
            {this.props.body}
            </React.Fragment>
            );
        }
        return ( menu);
    }
}
 
export default MainPage;