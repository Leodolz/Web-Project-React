import React, { Component } from 'react';

class StudentTable extends Component {
    state = 
    {
        commingExam: false,
    }

    constructor(props)
    {
        super(props);
        if(this.props.commingExam)
            this.state.commingExam = true;
    }
    clickDetailsHandler = (event) =>
    {
        this.GetExamByName(event.target.title);
    }
    GetExamByName = (name) =>
    {
        //FETCH 
        if(this.state.commingExam)
            window.location.assign("/ExamStudent");
        else
            window.location.assign("/studentExm");
        console.log(name);
    }
    renderTable(entries)
    {
        let table = [];
        let details = "Details";
        if(this.state.commingExam)
            details = "Take Exam";
        for(let i=0;i<entries.length;i++)
        {
            let children = [];
            children.push(<td key={"title"+i}>{entries[i].title}</td>)
            children.push(<td key={"fromDate"+i}>{entries[i].fromDate}</td>)
            children.push(<td key={"untilDate"+i}>{entries[i].untilDate}</td>)
            children.push(<td key={"score"+i}>{entries[i].studentTotalScore}/100</td>)
            children.push(<td key={"details"+i}>
                <p title={entries[i].title} className="tDetails" onClick={this.clickDetailsHandler}>{details}</p>
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