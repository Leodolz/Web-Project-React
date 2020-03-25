import React, { Component } from 'react';

class ResponsiveNavBar extends Component {
    state = {  }
    render() { 
        return ( 
        <div className="topnav">
            <a className={this.props.home} href="/main">Home</a>
            <a className= {this.props.news} href="/news">News</a>
            <a className = {this.props.contact} href="/contact">Contact Us</a>
            <a className= {this.props.about} href="/about">About</a>
            <div id = "UserInfo">
            <a>User: {this.props.username}</a>
            <a href="" className="active" onClick={this.props.onLogout}>Logout</a>
            </div>
            
        </div> 
      );
    }
}
 
export default ResponsiveNavBar;