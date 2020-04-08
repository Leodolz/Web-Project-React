import React, { Component } from 'react';
import userImg from '../images/userImage.png';

class LoginForm extends Component {
    state = { contact: {}, username: '', display:null }
    render() { 
        return (
            <React.Fragment>
                <form id="StudentForm" onSubmit={this.handleSubmit}  /*method="get"*/ >
                    <div className="imgContainter">
                        <img src={userImg} alt="Student" className="avatar"/>
                    </div>
                    <div className= "containerForm">
                        <label><b>Username: </b></label>
                        <input onChange={this.handleChange} type="text" name="uname" placeholder="Enter Username" required/>
                        <br></br>
                        <label><b>Password: </b></label>
                        <input type="password" name="pass" placeholder="Enter Password" required />
                        <br></br>
                        <button type="submit" >Login</button>
                    </div>
                    <div className="containerForm" >
                        <button onClick={this.handlePost} className="registerBtn">Register Name</button>
                    </div>
                </form>
                
            </React.Fragment>
        );
    }
    handleChange =(event) =>
    {
        event.preventDefault();
        this.setState({username:event.target.value});
    }
    handleSubmit =(event) =>
    {
        event.preventDefault();
        let username = event.target.uname.value;
        let password = event.target.pass.value;
        let encrypted = '';
        let context = this;
        Promise.resolve(this.sha256(password)).then(function(value)
        {
            encrypted = value;
            fetch('http://localhost:51061/api/Users?username='
            +username+'&password='+encrypted)
            .then(result=>result.json())
            .then((data)=>{
                context.setState({contacts: data});
                console.log(context.state.contacts.id);
                window.location.assign('/home');
            })
           .catch((e)=>{
            alert("Incorrect username");
            console.log(e);
            document.getElementById("StudentForm").reset();
            });
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

    handleCatch = ()=>
    {
        alert("Incorrect username");
        document.getElementById("StudentForm").reset();
    }
    handlePost = (event) =>
    {
        let userName = this.state.username;
        event.preventDefault();
        fetch('http://localhost:51061/api/Users/',
        {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 3,
                name: userName,
                email: 'leandro@bolivia.com',
                phone: '888888',
                role: 10
            })
        })
        console.log(this.state.username);
    }
}
 
export default LoginForm;