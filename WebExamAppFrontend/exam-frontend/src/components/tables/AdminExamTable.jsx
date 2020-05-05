import React, { Component } from 'react';

class AdminExamTable extends Component {
    state = {  }
    clickDetailsHandler = (event) =>
    {
        this.fetchExamById(event.target.title);
        if(this.props.past)
            sessionStorage.setItem('NewExam','true');
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
            let detailsEntry = <p title={entries[i].Id} className="tDetails" onClick={this.clickDetailsHandler}>Edit</p>;
            if(this.props.past)
            detailsEntry =  <p title={entries[i].Id} className="tDetails" onClick={this.clickDetailsHandler}>Copy new</p>;
            children.push(<td key={"title"+i}>{entries[i].title}</td>)
            children.push(<td key={"fromDate"+i}>{entries[i].fromDate}</td>)
            children.push(<td key={"untilDate"+i}>{entries[i].untilDate}</td>)
            children.push(<td key={"area"+i}>{entries[i].area}</td>)
            children.push(<td key={"subarea"+i}>{entries[i].subarea}</td>)
            children.push(<td key={"Edit"+i}>
                {detailsEntry}
            </td>)
            table.push(<tr key={"group"+i}>{children}</tr>);
        }
        return table;
    }
    render() { 
        let tableBody = this.renderTable(this.props.table);
        let editEntry = <th>Edit Exam</th>;
        if(this.props.past)
            editEntry = <th>Copy new</th>;
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
                        {editEntry}
                    </tr>
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default AdminExamTable;