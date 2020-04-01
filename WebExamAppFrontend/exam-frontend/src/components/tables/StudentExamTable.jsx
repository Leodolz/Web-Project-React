import React, { Component } from 'react';

class StudentTable extends Component {
    state = {  }
    clickDetailsHandler = (event) =>
    {
        this.GetExamByName(event.target.title);
    }
    GetExamByName = (name) =>
    {
        //FETCH 
        console.log(name);
    }
    renderTable(entries)
    {
        let table = [];
        for(let i=0;i<entries.length;i++)
        {
            let children = [];
            children.push(<td key={"title"+i}>{entries[i].title}</td>)
            children.push(<td key={"date"+i}>{entries[i].date}</td>)
            children.push(<td key={"score"+i}>{entries[i].score}</td>)
            children.push(<td key={"details"+i}>
                <p title={entries[i].title} className="tDetails" onClick={this.clickDetailsHandler}> View Details</p>
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
                    <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Details</th>
                    </tr>
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default StudentTable;