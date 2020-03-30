import React, { Component } from 'react';

class ResponsiveNavBar extends Component {
    state = {  }
    render() { 
        return ( 
        <div className="topnav">
            <a className={this.props.home} href="/home">Home</a>
            <div id = "UserInfo">
            <a >User: {this.props.username}</a>
            <a>Role: {this.props.role}</a>
            <a  className="active" href="/settings">Settings</a>
            <a href="/" className="active" onClick={this.props.onLogout}>Logout</a>
            </div>
        </div> 
      );
    }
}
 
export default ResponsiveNavBar;