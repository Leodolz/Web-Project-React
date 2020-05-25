import React, { Component } from 'react';
import {API_URL} from '../Globals';

class AdminStudentTable extends Component {
    state = {  }
    clickDetailsHandler = (event) =>
    {
        console.log(event.target.title);
        this.fetchStudentById(event.target.title)
        window.location.assign('/admStudent');
    }
    fetchStudentById(id)
    {
        fetch(API_URL+'Students/'+id)
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }
    clickDeleteHandler = (event) =>
    {
        if(window.confirm("Are you sure you want to delete this student?"))
            this.DeleteStudent(event.target.title);
    }
    DeleteStudent = (id) =>
    {
        fetch(API_URL+'Users/'+id,
            {
                method: 'DELETE',
            })
            .then(res=> window.location.assign('/home'))
            .catch((e)=>{alert("Error, couldn't add or edit student")});
            alert("Changes Succesfully done");
    }
    renderTable(entries)
    {
        let table = [];
        for(let i=0;i<entries.length;i++)
        {
            let children = [];
            children.push(<td key={"name"+i}>{entries[i].name}</td>)
            children.push(<td key={"username"+i}>{entries[i].username}</td>)
            children.push(<td key={"email"+i}>{entries[i].email}</td>)
            children.push(<td key={"areas"+i}>{entries[i].areas.join(", ")}</td>)
            children.push(<td key={"subareas"+i}>{entries[i].subareas.join(", ")}</td>)
            if(!this.props.teacher)
            {
                children.push(<td key={"Edit"+i}>
                    <p title={entries[i].id} className="tDetails" onClick={this.clickDetailsHandler}>Edit</p>
                </td>)
                 children.push(<td key={"Delete"+i}>
                 <p title={entries[i].id} className="tDelete" onClick={this.clickDeleteHandler}>Delete</p>
             </td>)
            }
            table.push(<tr key={"group"+i}>{children}</tr>);
        }
        return table;
    }
    render() { 

        let editEntry = <th>{"Edit "+this.props.role}</th>;
        let deleteEntry = <th>{"Delete "+this.props.role}</th>;
        let tableBody = this.renderTable(this.props.table);
        if(this.props.teacher)
        {
            editEntry = null;
            deleteEntry = null;
        }
        return ( 
            <div className="overflow-x:auto">
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Areas</th>
                        <th>Sub-Areas</th>
                        {editEntry}
                        {deleteEntry}
                    </tr>
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default AdminStudentTable;