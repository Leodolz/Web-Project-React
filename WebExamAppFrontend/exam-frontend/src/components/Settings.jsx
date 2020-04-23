import React, { Component } from 'react';
import MainPage from './controllers/UserController';
import Accordion from './Accordion';

class UserSettings extends Component {
    state = {
        oldPassword: "",
        user:  null,
      }

    constructor(props)
    {
        super(props);
        this.fetchOldPassword(JSON.parse(sessionStorage.getItem('User')).Id);
    }

    GetUser = (user) =>
    {
        this.setState({user:user});
    }
    fetchOldPassword = (userId) =>
    {
        let context = this;
        fetch('http://localhost:51061/api/PwdChange/'+userId)
        .then(result=>result.json())
        .then((data)=>{
            context.setState({oldPassword: data});
        })
       .catch((e)=>{
        alert("No exams found");
        console.log(e);
        });
    }
    handleSubmit=(event) =>
    {
        event.preventDefault();
        let oldPassword = event.target.oldpass.value;
        let newPassword = event.target.newpass.value;
        if(event.target.newpass.value != event.target.newpassconf.value)
        {
            alert("Password confirmation does not match with new password");
            return;
        }
        let userId = this.state.user.Id;
        let userOldPass = this.state.oldPassword;
        let context = this;
        Promise.resolve(this.sha256(oldPassword)).then(function(value)
        {
            let encrypted = value;
            if(encrypted!=userOldPass)
            {
                alert("Password confirmation does not match with old password");
                return;
            }
            else 
            {
                Promise.resolve(context.sha256(newPassword)).then(function(value)
                {

                    fetch('http://localhost:51061/api/PwdChange',
                    {
                        method: 'POST',
                        headers:{
                            'Accept':'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userId,
                            newPassword : value
                        })
                    })
                   .catch((e)=>{
                       alert("Could not change password");
                    });
                });
                alert("Password succesfully changed!");
            }
           
        });
    }
    async sha256(message) {
        const msgBuffer = new TextEncoder('utf-8').encode(message);                    
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));                
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.log(hashHex);
        return hashHex;
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