import React, { Component } from 'react';
import ResponsiveNavBar from './ResponsiveNavBar';

class MainPage extends Component {
    state= {user:null}
    constructor(props)
    {
        super(props);
        fetch('http://localhost:51061/api/Auth/')
        .then(result=>result.json())
        .then((data)=>{
            this.setState({user: data})
        })
        .catch(console.log);
       
    }

    logOff = () =>
    {
        fetch('http://localhost:51061/api/Users/~c')
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
             <ResponsiveNavBar onLogout={this.logOff} home="active" username={this.state.user.name}/>
             <h1> Welcome back {this.state.user.name}!</h1>
             </React.Fragment>
              );
        }
        console.log(this.state.user);
        return ( menu);
    }
}
 
export default MainPage;