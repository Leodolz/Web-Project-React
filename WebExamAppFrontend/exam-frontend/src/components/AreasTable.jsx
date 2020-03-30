import React, { Component } from 'react';

class AreasTable extends Component {
    state = {  }
    clickDetailsHandler = (event) =>
    {
        console.log(event.target.title);
    }
    renderTable(entries)
    {
        let table = [];
        for(let i=0;i<entries.length;i++)
        {
            let children = [];
            children.push(<td key={"name"+i}>{entries[i].name}</td>)
            children.push(<td key={"created"+i}>{entries[i].created}</td>)
            children.push(<td key={"students"+i}>{entries[i].students}</td>)
            children.push(<td key={"Edit"+i}>
                <p title={entries[i].title} className="tDetails" onClick={this.clickDetailsHandler}>Edit</p>
            </td>)
            table.push(<tr key={"group"+i}>{children}</tr>);
        }
        return table;
    }
    render() { 
        let tableBody = this.renderTable(this.props.table);
        return ( 
            <div className="overflow-x:auto">
                <table>
                <caption><h3>Sub-Areas</h3></caption>
                    <tbody>
                        
                    <tr>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Students</th>
                        <th>Edit Area</th>
                    </tr>
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default AreasTable;