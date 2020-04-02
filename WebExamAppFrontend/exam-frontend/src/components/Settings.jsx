import React, { Component } from 'react';
import MainPage from './controllers/UserController';
import Accordion from './Accordion';

class UserSettings extends Component {
    state = {  }

    GetUser = (user) =>
    {
        this.setState({user:user});
    }
    handleSubmit=(event) =>
    {
        event.preventDefault();
        if(event.target.newpass.value != event.target.newpassconf.value)
        {
            alert("Password confirmation does not match with new password");
            return;
        }
        console.log(event.target.oldpass.value);
        //fetch with old password as starting session and then 
        //Change password
    }
    render() { 
        let body = 
        (
                <form id="StudentForm" onSubmit={this.handleSubmit}  /*method="get"*/ >
                    <div className= "containerForm">
                        <br></br>
                        <label><b>Old Password: </b></label>
                        <input type="password" name="oldpass" placeholder="Enter Old Password" required />
                        <br></br>
                        <label><b>New Password: </b></label>
                        <input type="password" name="newpass" placeholder="Enter New Password" required />
                        <br></br>
                        <label><b>Enter Again: </b></label>
                        <input type="password" name="newpassconf" placeholder="Enter New Password" required />
                        <br></br>
                        <button type="submit" >Change Password</button>
                    </div>
                </form>
        );
        return ( 
            <React.Fragment>
                <MainPage role={"Student"} body={body} home="active" GetUser={this.GetUser}/>
            </React.Fragment>
         );
    }
}
 
export default UserSettings;