import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getData, getArray} from '../../redux/actions';

class UserGetter extends Component {
    state = { 
        student: null
     }

    handleSubmit(event, context)
    {
        event.preventDefault();
        console.log(event.target.id.value);
        context.props.getArray("/Student/"+event.target.id.value,function(data){data.name+="MOD"; return data});
    }

    render() { 
        return ( 
            <>
                <form id="StudentForm" onSubmit={(event)=>this.handleSubmit(event,this)}>
                    <div className="container">
                        <label><b>Search by ID: </b></label>
                        <input type="text" placeholder="Enter ID" name="id" required/>
                        <br/>
                        <button type="submit">Search</button>
                    </div>
                </form>
                <div>{this.props.student}</div>
            </>
         );
    }
}

function mapStateToProps(state)
{
    let student = state.consulter[0];
    return{
        student: student!=null? <h1>Welcome! {student.name} of age {student.age}</h1>: null,
    };
}
 
export default connect(mapStateToProps, {getArray})(UserGetter);