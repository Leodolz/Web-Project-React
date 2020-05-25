import React, { Component } from 'react';
import userImg from '../images/userImage.png';
import ImageUploader from './smallComponents/ImageUploader';
import {API_URL} from './Globals';

class LoginForm extends Component {
    state = { contact: {}, username: '', display:null, user:null }
    constructor(props)
    {
        super(props);
        document.title = "Login";
    }
    render() { 
        return (
            <>
                <form id="StudentForm" onSubmit={this.handleSubmit}   >
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
                    
                </form>
            </>
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
        let context = this;
        Promise.resolve(this.sha256(password)).then(function(value)
        {
            let encrypted = value;
            fetch(API_URL+'Users/username='
            +username+'&password='+encrypted)
            .then(result=>result.json())
            .then((data)=>{
                context.setState({user: data});
                sessionStorage.setItem('User',JSON.stringify(data));
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
        const msgBuffer = this.textEncode(message);                    
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));                
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.log(hashHex);
        return hashHex;
    }
    textEncode(str) {
        if (window.TextEncoder) {
            return new TextEncoder('utf-8').encode(str);
        }
        var utf8 = unescape(encodeURIComponent(str));
        var result = new Uint8Array(utf8.length);
        for (var i = 0; i < utf8.length; i++) {
            result[i] = utf8.charCodeAt(i);
        }
        return result;
    }

    handleCatch = ()=>
    {
        alert("Incorrect username");
        document.getElementById("StudentForm").reset();
    }
}
 
export default LoginForm;