import React, { Component } from 'react';
import ResponsiveNavBar from '../ResponsiveNavBar';

 class MainPage extends Component{

    state = {
        user: null,
       };
  constructor(props)
    {
        super(props);
        this.props.GetUser(this.state.user);
        fetch('http://localhost:51061/api/Auth/')
        .then(result=>result.json())
        .then((data)=>{
            this.setState({user: data})
            this.props.GetUser(data);
        })
        .catch(console.log);
    }


    logOff = () =>
    {
        fetch('http://localhost:51061/api/Logout')
        .then(result=>result.json())
        .then((data)=>{
            this.forceUpdate();
          })
          .catch(console.log);
    }

    render() { 
        let menu = <h1> <a href="/">You need to autenticate</a></h1>;
        if(this.state.user)
        {
            menu = (
            <React.Fragment>
             <ResponsiveNavBar 
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