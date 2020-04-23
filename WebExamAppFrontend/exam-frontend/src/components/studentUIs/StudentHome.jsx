import React, { Component } from 'react';
import Accordion from '../Accordion';
import StudentTable from '../tables/StudentExamTable'

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
        this.FetchStudentPastExamsTable(this.state.user.Id);
        this.FetchStudentFutureExamsTable(this.state.user.Id);
        this.FetchStudentPresentExamsTable(this.state.user.Id);
    }
    FetchStudentPastExamsTable = (userId) =>
    {
        this.setState({loading: true});
        let context = this;
        fetch('http://localhost:51061/api/StudentExams/'+userId+
        '?time=past')
        .then(result=>result.json())
        .then((data)=>{
            context.setState({pastExams: data});
            console.log(data);
        })
       .catch((e)=>{
        alert("No exams found");
        console.log(e);
        });
    }
    FetchStudentPresentExamsTable = (userId) =>
    {
        this.setState({loading: true});
        let context = this;
        fetch('http://localhost:51061/api/StudentExams/'+userId+
        '?time=present')
        .then(result=>result.json())
        .then((data)=>{
            context.setState({presentExams: data});
            console.log(data);
        })
       .catch((e)=>{
        alert("No exams found");
        console.log(e);
        });
    }
    FetchStudentFutureExamsTable = (userId) =>
    {
        this.setState({loading: true});
        let context = this;
        fetch('http://localhost:51061/api/StudentExams/'+userId+
        '?time=future')
        .then(result=>result.json())
        .then((data)=>{
            context.setState({futureExams: data});
            console.log(data);
        })
       .catch((e)=>{
        alert("No exams found");
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

    RenderPresentExams()
    {
        if(this.state.presentExams == null || this.state.presentExams[0] == null)
            return null;
        return(
            <React.Fragment>
                <h1>Present Exams:</h1>
                <StudentTable presentExam={true} table={this.state.presentExams}/>
            </React.Fragment>
        );
    }

    render() {
        console.log(this.state.exams);
        let overlay = this.GetOverlayForm();
        let presentExams = this.RenderPresentExams();
        if(this.state.pastExams == null || this.state.futureExams == null || this.state.presentExams == null)
            return(<h1>Loading Page...</h1>);
        let accordions = this.GetNewStudentBody();
        return (
            <React.Fragment>
            <h1>Welcome Student: {this.state.user.full_name}</h1>
            {presentExams}
            <Accordion accordions= {accordions}/>
            {overlay}
            </React.Fragment>
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

    GetExamsBody = (examsTable,future) => 
    {
        let pastExamsBody = [];
        for(let i=0;i<examsTable.length;i++)
        {
            let container = 
            {
                title: examsTable[i].name,
                body: (
                    <React.Fragment>
                        <StudentTable commingExam={future} table={examsTable[i].exams}/>
                    </React.Fragment>
                )
            }
            pastExamsBody.push(container);
        }
        return pastExamsBody;
    }

    GetNewStudentBody = () =>
    {
        let pastExamsTable = this.SortByArea(this.state.pastExams);
        let pastExamsBody = this.GetExamsBody(pastExamsTable,false);
        let commingExamsTable = this.SortByArea(this.state.futureExams);
        let commingExamsBody = this.GetExamsBody(commingExamsTable,true);
        
        return [
            {
                title:"Past Exams",
                body:
                {
                    multi: pastExamsBody
                },
            },
            {
                title:"Coming Exams",
                body:
                {
                    multi: commingExamsBody
                },
            },
        ];

    }

    
}

 
export default StudentHome;