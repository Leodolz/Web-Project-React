import React, { Component } from 'react';
import Accordion from '../Accordion';
import StudentTable from '../tables/StudentExamTable'
import HorizontalTabs from '../HorizontalTabs';

class StudentHome extends Component {
    state=
    {
        user:this.props.user,
        overlayed : 
        {
            overlay: false,
            body : null,
        },
        pastExams: null,
        futureExams:null,
        presentExams: null
    }
    constructor(props)
    {
        super(props);
        document.title = "Student Home";
        let userId = props.user.Id;
        this.FetchGenericTable('StudentExams/'+userId+'?time=future','futureExams');
        this.FetchGenericTable('StudentExams/'+userId+'?time=present','presentExams');
        this.FetchGenericTable('StudentExams/'+userId+'?time=past','pastExams');
    }
    FetchGenericTable = (url,stateVariable) =>
    {
        let context = this;
        fetch('http://localhost:51061/api/'+url)
        .then(result=>result.json())
        .then((data)=>{
            let sortedData = context.SortByArea(data);
            context.setState({[stateVariable]: sortedData});
        })
       .catch((e)=>{
        alert("No students found");
        console.log(e);
        });
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            body:null
        }})
    }
    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
            return (
                <div className="overlayedHome">
                    {this.state.overlayed.body}
                <button type="button" onClick= {this.cancelEdit}>OK</button>
                </div>
            );
        else return null;
    }

    //Delete when posible
    RenderPresentExams()
    {
        if(this.state.presentExams == null || this.state.presentExams[0] == null)
            return [];
        return(
            <React.Fragment>
                <h1>Present Exams:</h1>
                <StudentTable examTime={"present"} table={this.state.presentExams}/>
            </React.Fragment>
        );
    }

    render() {
        if(this.state.pastExams == null || this.state.futureExams == null || this.state.presentExams == null)
            return(<h1>Loading Page...</h1>);
        let pastExamsTable = this.state.pastExams;
        let pastExamsBody = this.GetExamsBody(pastExamsTable,"past");
        let commingExamsTable = this.state.futureExams;
        let commingExamsBody = this.GetExamsBody(commingExamsTable,"future");
        let presentExams = this.GetExamsBody(this.state.presentExams,"present");
        let allTabs = [
            {id: 0, title: "Past Exams", body: pastExamsBody},
            {id: 1,title: "Coming Exams", body: commingExamsBody},
            {id: 2,title: "Present Exams", body: presentExams},
        ];
        let overlay = this.GetOverlayForm();
        return (
            <>
                <HorizontalTabs allTabs= {allTabs} default={0}/>
                {overlay}
            </>
        );
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
    }
    

    SortByArea = (examsTable) =>
    {
        let sortedAreas = [];
        for(let i=0;i<examsTable.length;i++)
        {
            let examItem = examsTable[i];
            if(sortedAreas.find(areaItem => areaItem.name==examItem.area)==null)
            {
                let areaItem = {name:examItem.area,exams:[]}
                for(let j=0;j<examsTable.length;j++)
                {
                    if(examsTable[j].area == areaItem.name)
                        areaItem.exams.push(examsTable[j]);
                }
                sortedAreas.push(areaItem);
            }
        }
        return sortedAreas;
    }

    GetExamsBody = (examsTable,time) => 
    {
        let examsBody = [];
        console.log(examsTable.length);
        if(examsTable.length <1)
            return <h1>No {time} exams to show</h1>;
        for(let i=0;i<examsTable.length;i++)
        {
            let container = 
            {
                title: examsTable[i].name,
                body: (
                    <React.Fragment>
                        <StudentTable examTime={time} table={examsTable[i].exams}/>
                    </React.Fragment>
                )
            }
            examsBody.push(container);
        }
        return <Accordion accordions= {examsBody}/>;
    }

    /*
    {
                title:"Past Exams",
                body:
                {
                    multi: pastExamsBody
                },
            },
     */
}

 
export default StudentHome;