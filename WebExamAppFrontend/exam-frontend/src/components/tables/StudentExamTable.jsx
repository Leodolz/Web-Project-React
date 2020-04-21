import React, { Component } from 'react';

class StudentTable extends Component {
    state = 
    {
        commingExam: false,
        presentExam: false,
    }

    constructor(props)
    {
        super(props);
        if(this.props.commingExam)
            this.state.commingExam = true;
        if(this.props.presentExam)
            this.state.presentExam = true;
    }
    clickDetailsHandler = (event) =>
    {
        this.GetExamByName(event.target.title);
    }
    fetchPastExamById(id)
    {
        fetch('http://localhost:51061/api/StudentExams/'+id)
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
        
    }
    fetchExamById(id)
    {
        fetch('http://localhost:51061/api/Exams/'+id+
            "?student=true")
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }
    GetExamByName = (id) =>
    {

        if(this.state.presentExam)
        {
            this.fetchExamById(id);
            window.location.assign("/ExamStudent");
        }
        else 
        {
            this.fetchPastExamById(id);
            window.location.assign("/studentExm");
        }
    }
    renderTable(entries)
    {
        let table = [];
        let details = "Details";
        if(this.state.presentExam)
            details = "Take Exam";
        
        for(let i=0;i<entries.length;i++)
        {
            let detailsEntry = (<td key={"details"+i}>
            <p title={entries[i].Id} className="tDetails" onClick={this.clickDetailsHandler}>{details}</p>
            </td>);
            if(this.state.commingExam)
                detailsEntry = null;
            let children = [];
            children.push(<td key={"title"+i}>{entries[i].title}</td>)
            children.push(<td key={"fromDate"+i}>{entries[i].fromDate}</td>)
            children.push(<td key={"untilDate"+i}>{entries[i].untilDate}</td>)
            children.push(<td key={"score"+i}>{entries[i].studentTotalScore}/100</td>)
            children.push(detailsEntry);
            table.push(<tr key={"group"+i}>{children}</tr>);
        }
        return table;
    }
    render() { 
        let tableBody = this.renderTable(this.props.table);
        let detailsEntry = <th>Details</th>;
        if(this.state.commingExam)
            detailsEntry = null;
        return ( 
            <div className="overflow-x:auto">
                <table>
                    <tbody>
                    <tr>
                        <th>Title</th>
                        <th>From</th>
                        <th>Until</th>
                        <th>Score</th>
                        {detailsEntry}
                    </tr>
                    {tableBody}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default StudentTable;