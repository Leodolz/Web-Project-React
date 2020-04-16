import React, { Component } from 'react';

class AdminExamTable extends Component {
    state = {  }
    clickDetailsHandler = (event) =>
    {
        this.fetchExamById(event.target.title);
        window.location.assign('/admExam');
    }
    fetchExamById(id)
    {
        fetch('http://localhost:51061/api/Exams/'+id+
            "?student=false")
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
            children.push(<td key={"title"+i}>{entries[i].title}</td>)
            children.push(<td key={"fromDate"+i}>{entries[i].fromDate}</td>)
            children.push(<td key={"untilDate"+i}>{entries[i].untilDate}</td>)
            children.push(<td key={"area"+i}>{entries[i].area}</td>)
            children.push(<td key={"subarea"+i}>{entries[i].subarea}</td>)
            children.push(<td key={"Edit"+i}>
                <p title={entries[i].Id} className="tDetails" onClick={this.clickDetailsHandler}>Edit</p>
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
                        <th>From</th>
                        <th>Until</th>
                        <th>Area</th>
                        <th>Sub-Area</th>
                        <th>Edit Exam</th>
                    </tr>
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default AdminExamTable;