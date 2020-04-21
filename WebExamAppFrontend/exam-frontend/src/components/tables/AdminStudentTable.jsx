import React, { Component } from 'react';

class AdminStudentTable extends Component {
    state = {  }
    clickDetailsHandler = (event) =>
    {
        console.log(event.target.title);
        if(this.props.userTable)
            this.fetchUserById(event.target.title);
        else
            this.fetchStudentById(event.target.title)
        window.location.assign('/admStudent');
    }
    fetchStudentById(id)
    {
        fetch('http://localhost:51061/api/Students/'+id)
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }
    fetchUserById(id)
    {
        fetch('http://localhost:51061/api/Students/'+id)
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
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
            children.push(<td key={"Edit"+i}>
                <p title={entries[i].Id} className="tDetails" onClick={this.clickDetailsHandler}>Edit</p>
            </td>)
            table.push(<tr key={"group"+i}>{children}</tr>);
        }
        return table;
    }
    render() { 
        let editEntry = "Edit Student";
        if(this.props.userTable)
            editEntry = "Edit User";
        let tableBody = this.renderTable(this.props.table);
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
                        <th>{editEntry}</th>
                    </tr>
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default AdminStudentTable;