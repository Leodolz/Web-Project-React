import React, { Component } from 'react';
import Accordion from '../Accordion';
import StudentTable from '../tables/StudentExamTable'

class StudentHome extends Component {
    state=
    {
        loading :false,
        user:this.props.user,
        overlayed : 
        {
            overlay: false,
            body : null,
        },
        exams: null,
    }
    FetchStudentExamsTable = (userId) =>
    {
        this.setState({loading: true});
        let context = this;
        fetch('http://localhost:51061/api/StudentExams/'+userId)
        .then(result=>result.json())
        .then((data)=>{
            context.setState({exams: data});
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
    render() {
        console.log(this.state.exams);
        let overlay = this.GetOverlayForm();
        if(this.state.loading == false && this.state.user!=null)
            this.FetchStudentExamsTable(this.state.user.Id);
        if(this.state.exams == null)
            return(<h1>Loading Page...</h1>);
        let accordions = this.GetNewStudentBody();
        return (
            <React.Fragment>
            <h1>Welcome Student: {this.state.user.name}</h1>
            <Accordion accordions= {accordions}/>
            {overlay}
            </React.Fragment>
            );
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
        this.FetchStudentExamsTable(user.Id);
    }

    GetStudentPastExamsTable = ()=>
    {
        //Replace by a fetch IT HAS TO HAVE THESE ATTRIBUTES
        return(
            [
                {
                    title: "Algebra-1-Apr",
                    date: "3/26/2020",
                    area: "Math",
                    subarea: "Algebra",
                    score: "50/100"
                },
                {
                    title: "Geometry-mod-2",
                    date: "3/27/2020",
                    area: "Math",
                    subarea: "Geometry",
                    score: "not available"
                },
                {
                    title: "World-History-mod-1",
                    date: "4/1/2020",
                    area: "History",
                    subarea: "World History",
                    score: "70/100"
                },
                {
                    title: "Ad-Geometry-mod-2",
                    date: "3/15/2020",
                    area: "Math",
                    subarea: "Advanced Geomtry",
                    score: "not available"
                },
                {
                    title: "Extra-1",
                    date: "4/25/2020",
                    area: "Extra",
                    subarea: "Miscellanous",
                    score: "100/100"
                },
            ]
        );
    }
    GetStudentNextExamsTable = ()=>
    {
         //Replace by a fetch IT HAS TO HAVE THIS ATTRIBUTES
        return(
            [
                {
                    title: "Algebra-2-Apr",
                    date: "5/26/2020",
                    area: "Math",
                    subarea: "Algebra",
                    score: "not available"
                },
                {
                    title: "Generic Exam",
                    date: "4/7/2020",
                    area: "Math",
                    subarea: "Geometry",
                    score: "not available"
                },
                {
                    title: "World-History-mod-2",
                    date: "5/1/2020",
                    area: "History",
                    subarea: "World History",
                    score: "not available"
                },
                {
                    title: "Ad-Geometry-mod-3",
                    date: "5/15/2020",
                    area: "Math",
                    subarea: "Advanced Geometry",
                    score: "not available"
                },
                {
                    title: "Extra-2",
                    date: "6/25/2020",
                    area: "Extra",
                    subarea: "Miscellanous",
                    score: "not available"
                },
            ]
        );
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
        let pastExamsTable = this.SortByArea(this.state.exams);
        let pastExamsBody = this.GetExamsBody(pastExamsTable,false);
        let commingExamsTable = this.SortByArea(this.GetStudentNextExamsTable());
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

    RenderSubAreasList = (studentArray) =>
    {
        let renderedList = [];
        for(let i=0;i<studentArray.length;i++)
        {
            let student = studentArray[i];
            let studentItem = <li key={"student"+i} id={"Student"+i} title={student}><span className="etag">{(i+1)+". "}</span> {student}</li>;
            renderedList.push(studentItem);
        }
        return renderedList;
    }

    showStudentsAreas = (event) =>
    {
        //Fetch Students for area
        //Delete the line below:
        let students = ["Leandro Hurtado","Other Student","More Students"];
        let name = event.target.parentElement.title;
        let renderedStudents = (
            <React.Fragment key={"Student"}>
            <h1 className="overlayHeader">Students of: {name}</h1>
            <ul id="HomeStudentsUL" className="myUL">
                {this.RenderSubAreasList(students)}
            </ul>
            </React.Fragment> 
        );
        let overlayed = {
            overlay: true,
            body: renderedStudents
        }
        this.setState({overlayed:overlayed});
    }
}

 
export default StudentHome;