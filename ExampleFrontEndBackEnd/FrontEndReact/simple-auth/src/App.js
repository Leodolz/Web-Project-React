import React, { Component } from 'react';
import './App.css';

class App extends Component{

  state = 
  {
    student:null,
  }

  handleSubmit =(event) =>
    {
        event.preventDefault();
        let id = event.target.id.value;
        fetch('http://localhost:44304/api/Students/'+id) //for ASP Core 
        //fetch('http://localhost:63466/api/Student/'+id) //for ASP NET Framework
        .then(result=> result.json())
        //.then(result=>result.text()) When you are sending just a string in ASP Net Core
        .then((data)=>{
          console.log(data);
            this.setState({student: data})
            console.log(this.state.student);
        })
        .catch(e=>console.log(e));
    }
  
  handleRegister = (event) =>
  {
    event.preventDefault();
    let studentName = event.target.name.value;
    let studentAge = event.target.age.value;
      fetch('http://localhost:44304/api/Students', //For NET Core
      //fetch('http://localhost:63466/api/Student', //For NET Framework
      {
          method: 'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id: 0,
              name: studentName,
              age: studentAge
          })
      })
      .catch(e=>alert(e));
    alert("Registered new student");
  }
  handleSearchCatch = ()=>
  {
      alert("Non-existing ID");
      this.setState({student:null});
      document.getElementById("StudentForm").reset();
  }

  render() {
    let studentLogged = null;
    if(this.state.student!=null)
  studentLogged = <h1>Welcome! {this.state.student.name} of age {this.state.student.age}</h1>;
  return (
    <React.Fragment>
      <form id="StudentForm" onSubmit={this.handleSubmit}>
        <div className="container">
          <label><b>Search by ID: </b></label>
          <input type="text" placeholder="Enter ID" name="id" required/>
          <br/>
          <button type="submit">Search</button>
        </div>
      </form>
      <div>{studentLogged}</div>
      <br/>
      <form id="StudentRegister" onSubmit={this.handleRegister}>
        <div className="container">
          <label><b>Register Student: </b></label>
          <input type="text" placeholder="Enter name" name="name" required/>
          <br/>
          <input type="text" placeholder="Enter age" name="age" required/>
          <br/>
          <button type="submit">Register</button>
        </div>
      </form>
    </React.Fragment>
  );
  }
}

export default App;
