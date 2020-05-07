import React, { Component } from 'react';

class AdminExamTable extends Component {
    state = {
        table : this.props.table,
        sortingTitles: 
        {
            title: "arrow down",
            fromDate: "none",
            untilDate: "none",
            area: "none",
            subarea: "none",
        },
        currentSorted: "title",
      }
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
    onSort(e, sortKey)
    {
        const data = this.state.table.slice();
        const currentSorted = sortKey;
        data.sort((a,b)=>a[sortKey].localeCompare(b[sortKey]));
        this.setState({table:data,
            currentSorted});
        let sortingTitles= this.state.sortingTitles;
        let newSortingTitles = this.changeStates(sortingTitles,currentSorted);
        this.setState({sortingTitles:newSortingTitles});
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
        let tableBody = this.renderTable(this.state.table);
        let editEntry = <th>Edit Exam</th>;
        if(this.props.past)
            editEntry = <th>Copy new</th>;
        return ( 
            <div className="overflow-x:auto">
                <table>
                    <tbody>
                    <tr>
                        <th className="tSortable" onClick = {e=>this.onSort(e, 'title')}>Title <i className={this.state.sortingTitles.title}></i></th>
                        <th className="tSortable" onClick = {e=>this.onSort(e, 'fromDate')}>From <i className={this.state.sortingTitles.fromDate}></i></th>
                        <th className="tSortable" onClick = {e=>this.onSort(e, 'untilDate')}>Until <i className={this.state.sortingTitles.untilDate}></i></th>
                        <th className="tSortable" onClick = {e=>this.onSort(e, 'area')}>Area <i className={this.state.sortingTitles.area}></i></th>
                        <th className="tSortable" onClick = {e=>this.onSort(e, 'subarea')}>Sub-Area <i className={this.state.sortingTitles.subarea}></i></th>
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