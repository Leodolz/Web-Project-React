import React, { Component } from 'react';

class ResponsiveTable extends Component {
    state = {  }
    clickDetailsHandler = (event) =>
    {
        console.log(event.target.id);
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
                <p id={entries[i].title} className="tDetails" onClick={this.clickDetailsHandler}> View Details</p>
            </td>)
            table.push(<tr key={"group"+i}>{children}</tr>);
        }
        return table;
    }
    render() { 
        let tableBody = this.renderTable
        (
            [
                {
                    title: "Algebra",
                    date: "3/26/2020",
                    score: "50/100"
                },
                {
                    title: "Geometry",
                    date: "3/27/2020",
                    score: "undefined"
                }
            ]
        );
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
 
export default ResponsiveTable;