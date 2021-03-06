import React, { Component } from 'react';
import MainPage from './UserController';
import SubAreaEditor from '../adminUIs/SubAreaEditor';
import {API_URL} from '../Globals';

class AddEditSubAreas extends Component {
    state={
        user:null,
        subarea: null,
        new: false,
    }
    FetchSubArea = () =>
    {
        fetch(API_URL+'EditSubArea')
        .then(result=>result.json())
        .then((data)=>{
            if(data.name)
            {
                this.setState({subarea: data});
                console.log("with name: "+data);
            }
            else 
            {
                console.log(data);
                this.setState({subarea: this.GetEmptySubArea(data)});
                this.setState({new:true});
            }
        })
        .catch((e)=>{
           
        });
    }
    GetEmptySubArea = (parentAreaId) =>
    {
        return {
            name: null,
            students: [],
            studentsObj: [],
            teachersObj: [],
            Id: 0,
            parentAreaId: parentAreaId
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
                <SubAreaEditor subArea = {subarea} new = {this.state.new} />
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