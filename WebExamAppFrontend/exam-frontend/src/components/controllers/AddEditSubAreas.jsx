import React, { Component } from 'react';
import MainPage from './UserController';
import SubAreaEditor from '../adminUIs/SubAreaEditor';

class AddEditSubAreas extends Component {
    state={
        user:null,
        subarea: null,
    }
    FetchSubArea = () =>
    {
        fetch('http://localhost:51061/api/EditSubArea')
        .then(result=>result.json())
        .then((data)=>{
            this.setState({subarea: data});
        })
        .catch((e)=>{
            this.setState({subarea: this.GetEmptySubArea()});
            this.setState({new:true});
        });
    }
    GetEmptySubArea = () =>
    {
        return {
            name: null,
            students: [],
            Id: 0,
        };
    }

    render() {
        let body = null;
        let role = '';
        let subarea= null;
        if(this.state.subarea == null)
            this.FetchSubArea();
        subarea= this.state.subarea;
        if(this.state.user)
        {
            role = this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            if(!admin || subarea==null)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">Sub-Area editor</h1>
                <SubAreaEditor subArea = {subarea}/>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
            <MainPage role={role} body={body} home="active" GetUser={this.GetUser}/>
            </React.Fragment>
          );
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
    }
}
 
export default AddEditSubAreas;