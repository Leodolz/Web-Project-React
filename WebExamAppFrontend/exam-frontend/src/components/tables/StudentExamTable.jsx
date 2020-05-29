import React, { Component } from 'react';
import {API_URL} from '../Globals';

class StudentTable extends Component {
    state = 
    {
        examTime: this.props.examTime,
        table : this.props.table,
        sortingTitles: 
        {
            title: "arrow down",
            fromDate: "none",
            untilDate: "none",
        },
        currentSorted: "title",
    }

    clickDetailsHandler = (event) =>
    {
        this.GetExamByName(event.target.title);
    }
    fetchPastExamById(id)
    {
        fetch(API_URL+'StudentExams/'+id)
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
        
    }
    fetchExamById(id)
    {
        fetch(API_URL+'Exams/'+id+
            "&student=true")
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }
    GetExamByName = (id) =>
    {
        switch(this.props.examTime)
        {
            case "present":
                this.fetchExamById(id);
                window.location.assign("/ExamStudent");
                break;
            case "past":
                this.fetchPastExamById(id);
                window.location.assign("/studentExm");
                break;
            default: 
                break;
        }
    }
    onSort(e, sortKey)
    {
        const table = this.props.table.slice();
        const currentSorted = sortKey;
        let oldSortingTitles= this.state.sortingTitles;
        const sortingTitles = this.changeStates(oldSortingTitles,currentSorted);
        table.sort((a,b)=>a[sortKey].localeCompare(b[sortKey]));
        this.setState({
            table,
            currentSorted,
            sortingTitles
        });
    }
    changeStates(sortingTitles, currentSorted)
    {
        for(let property in sortingTitles)
        {
            if(property == currentSorted)
                sortingTitles[property] = "arrow down";
            else sortingTitles[property] = "none";
        }
        return sortingTitles;
    }
    renderTable(entries)
    {
        let table = [];
        let details = "Details";
        if(this.props.examTime == "present")
            details = "Take Exam";
        
        for(let i=0;i<entries.length;i++)
        {
            let detailsEntry = (<td key={"details"+i}>
            <p title={entries[i].id} className="tDetails" onClick={this.clickDetailsHandler}>{details}</p>
            </td>);
            if(this.props.examTime == "future")
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
        if(this.props.examTime == "future")
            detailsEntry = null;
        return ( 
            <div className="overflow-x:auto">
                <table>
                    <tbody>
                    <tr>
                        <th className="tSortable" onClick = {e=>this.onSort(e, 'title')}>Title <i className={this.state.sortingTitles.title}></i></th>
                        <th className="tSortable" onClick = {e=>this.onSort(e, 'fromDate')}>From <i className={this.state.sortingTitles.fromDate}></i></th>
                        <th className="tSortable" onClick = {e=>this.onSort(e, 'untilDate')}>Until <i className={this.state.sortingTitles.untilDate}></i></th>
                        <th>Score </th>
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