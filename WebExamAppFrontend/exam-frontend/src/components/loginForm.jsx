import React, { Component } from 'react';
import userImg from '../images/userImage.png';

class LoginForm extends Component {
    state = { contacts: [], username: '', display:null }
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
        let name = event.target.uname.value;
        fetch('http://localhost:51061/api/Users/'+name)
        .then(result=>result.json())
        .then((data)=>{
            this.setState({contacts: data})
            console.log(this.state.contacts.id);
            window.location.assign('/main');
        })
        .catch(this.handleCatch);
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