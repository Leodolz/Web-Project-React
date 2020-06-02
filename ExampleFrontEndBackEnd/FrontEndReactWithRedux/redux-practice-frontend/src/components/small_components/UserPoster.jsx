import React, { Component } from 'react';
import {connect} from 'react-redux';
import {postObject} from '../../redux/actions';

class UserPoster extends Component {
    state = {  }

    handleRegister = (event) =>
    {
      event.preventDefault();
      let studentName = event.target.name.value;
      let studentAge = event.target.age.value;
      let student = {
            id: 0,
            name: studentName,
            age: studentAge
      };
      this.props.postObject("Student", student);
    }

    render() { 
        console.log(this.props.postStatus);
        return ( 
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
         );
    }
    
}

function mapStateToProps(state)
{
    return{
        postStatus: state.poster,
    };
}
 
export default connect(mapStateToProps,{postObject})(UserPoster);