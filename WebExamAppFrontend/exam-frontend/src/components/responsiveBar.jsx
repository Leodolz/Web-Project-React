import React, { Component } from 'react';

class VerticalResponsiveBar extends Component {
    
    state= {auth:false}
    constructor(props)
    {
        super(props);
        fetch('http://localhost:51061/api/Auth/')
        .then(result=>result.json())
        .then((data)=>{
            this.setState({auth: data})
        })
        .catch(console.log);
    }
    render() { 
        let menu = <h1> <a href="/">You need to autenticate</a></h1>;
        if(this.state.auth)
        menu = <h1> TODO: Change this</h1> ;
        console.log(this.state.auth);
        return ( menu);
    }
}
 
export default VerticalResponsiveBar;