import React, { Component } from 'react';
import MainPage from './UserController';
import AreaEditor from '../adminUIs/AreaEditor';
class AddEditAreas extends Component {
    state={
        user:null,
        area:null,
        new: false,
    }

    ObjectsToStrings(arrayOfObjects)
    {
        let outputArray = [];
        for(let i=0; i<arrayOfObjects.length; i++)
        {
            outputArray.push(arrayOfObjects[i].name);
        }
        return outputArray;
    }

    FetchArea = () =>
    {
        fetch('http://localhost:51061/api/EditArea')
        .then(result=>result.json())
        .then((data)=>{
            let refurbishedArea = data;
            refurbishedArea.subareas = this.ObjectsToStrings(data.subareas);
            this.setState({area: refurbishedArea});
        })
        .catch((e)=>{
            this.setState({area: this.GetEmptyArea()});
            this.setState({new:true});
        });
    }

    GetEmptyArea = () =>
    {
        return {
            name: null,
            subareas: [],
        };
    }

    render() {
        let body = null;
        let role = '';
        let area = null;
        console.log(this.state.area);
        if(this.state.area == null && this.state.user!=null)
            this.FetchArea();
        area = this.state.area;
        if(this.state.user)
        {
            role = this.state.user.role;
            let admin = this.state.user.role === "Admin"? true:false; 
            if(!admin || this.state.area == null)
                body= (<h1><a href='/'>You need Admin Permisions to be here</a></h1>);
            else
            body = (
                <React.Fragment >
                <h1 className="Editor">Area editor</h1>
                <AreaEditor area = {area} new ={this.state.new}/>
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
 
export default AddEditAreas;