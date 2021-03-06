import React, { Component } from 'react';
import {API_URL} from '../Globals';

class AreasTable extends Component {
    state = {  }
    clickDetailsHandler = (event) =>
    {
        this.fetchSubAreaById(event.target.title);
        window.location.assign("/admSubAreas")
    }
    clickManageHandler = (event) =>
    {
        sessionStorage.setItem('CurrentSubArea',event.target.title);
        window.location.assign("/admSubAreaQuestions");
    }
    fetchSubAreaById(id)
    {
        fetch(API_URL+'SubAreas/'+id)
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }
    
    clickStudentsHandler = (event) =>
    {
        event.preventDefault();
        this.props.showStudentsArea(event);
    }
   
    GetAdminTable = (entries) =>
    {
        let table = [];
        for(let i=0;i<entries.length;i++)
        {
            let children = [];
            children.push(<td key={"name"+i}>{entries[i].name}</td>)
            children.push(<td key={"created"+i}>{entries[i].created}</td>)
            children.push(<td title={entries[i].name} key={"students"+i}>
                <p title={entries[i].students.join(",")} className="tDetails" onClick={this.clickStudentsHandler}>View Students</p>
            </td>);
            children.push(<td key={"Edit"+i}>
                <p title={entries[i].id} className="tDetails" onClick={this.clickDetailsHandler}>Edit</p>
            </td>);
            children.push(<td key={entries[i].name+" Questions "+i}>
                <p title={entries[i].id} className="tDetails" onClick={this.clickManageHandler}>Manage</p>
            </td>)
            table.push(<tr key={"group"+i}>{children}</tr>);
        }
        return table;
    }

    GetTeacherTable = (entries) =>
    {
        let table = [];
        for(let i=0;i<entries.length;i++)
        {
            let children = [];
            children.push(<td key={"name"+i}>{entries[i].name}</td>)
            children.push(<td key={"created"+i}>{entries[i].created}</td>)
            children.push(<td key={entries[i].name+" Questions "+i}>
                <p title={entries[i].id} className="tDetails" onClick={this.clickManageHandler}>Manage</p>
            </td>)
            table.push(<tr key={"group"+i}>{children}</tr>);
        }
        return table;
    }

    renderTable(entries)
    {
        if(this.props.admin)
            return this.GetAdminTable(entries);
        else return this.GetTeacherTable(entries);
    }
    render() { 
        let authHeaders;
        if(this.props.admin)
            authHeaders=(
                <tr>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Students</th>
                    <th>Edit Sub-Area</th>
                    <th>Manage Questions</th>
                </tr>);
        else authHeaders = (<tr>
            <th>Name</th>
            <th>Created</th>
            <th>Manage Questions</th>
        </tr>);
        let tableBody = this.renderTable(this.props.table);
        return ( 
            <div className="overflow-x:auto">
                <table>
                <caption><h3>Sub-Areas</h3></caption>
                    <tbody> 
                    {authHeaders}
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default AreasTable;