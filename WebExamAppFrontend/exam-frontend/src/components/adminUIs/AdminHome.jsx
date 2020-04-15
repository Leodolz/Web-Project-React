import React, { Component } from 'react';
import Accordion from '../Accordion';
import AdminExamTable from '../tables/AdminExamTable'
import AdminStudentTable from '../tables/AdminStudentTable'
import AreasTable from '../tables/SubAreasTable'

class AdminHome extends Component {
    state=
    {
        user:this.props.user,
        overlayed : 
        {
            overlay: false,
            body : null,
        },
        students : [],
        areas: [],
        exams: []
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
        let overlay = this.GetOverlayForm();
        let accordions = this.GetAdminBody()
        return (
            <React.Fragment>
            <h1>Welcome Admin {this.state.user.username}</h1>
            <br/>
            <button>Add User</button>
            <button>View Users</button>
            <br/>
            <Accordion accordions= {accordions}/>
            {overlay}
            </React.Fragment>
            );
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
    }
    FetchAdminExamsTable = () =>
    {
        let context = this;
        fetch('http://localhost:51061/api/Exams')
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

    GetAdminExamsTable = ()=>
    {
        return(
            [
                {
                    title: "Algebra-1-Apr",
                    fromDate: "4/16/2020",
                    area: "Math",
                    subarea: "Algebra",
                },
                {
                    
                    title: "Gemoetry-2-Apr",
                    fromDate: "4/18/2020",
                    area: "Math",
                    subarea: "Geometry",
                },
                {
                    
                    title: "History-1-March",
                    fromDate: "3/30/2020",
                    area: "History",
                    subarea: "World History",
                }
            ]
        );
    }

    FetchAdminStudentsTable = ()=>
    {
        let context = this;
        fetch('http://localhost:51061/api/Students')
        .then(result=>result.json())
        .then((data)=>{
            context.setState({students: data});
            console.log(data);
        })
       .catch((e)=>{
        alert("No students found");
        console.log(e);
        });
    }

    FetchAdminAreasTable = ()=>
    {
        let context = this;
        fetch('http://localhost:51061/api/Areas')
        .then(result=>result.json())
        .then((data)=>{
            context.setState({areas: data});
            console.log(data);
        })
       .catch((e)=>{
        alert("No areas found");
        console.log(e);
        });
    }

    AddSubArea = (event) =>
    {
        event.preventDefault();
        //Fetch for null Area or generate null SubArea on AddEditSubAreas
        console.log("Add new Area");
        this.fetchSubAreaById(event.target.title);
        window.location.assign("/admSubAreas");
    }
    fetchSubAreaById(id)
    {
        fetch('http://localhost:51061/api/SubAreas/'+id+
            '?parentArea=true')
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }

    fetchAreaById(id)
    {
        fetch('http://localhost:51061/api/Areas/'+id)
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }

    GoEditArea = (event) =>
    {
        let areaId = event.target.title;
        this.fetchAreaById(areaId);
        window.location.assign("/admAreas");
    }

    RenderStudentList = (studentArray) =>
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

    showStudentsArea = (event) =>
    {
        //Fetch Students for area
        //Delete the line below:
        let students = event.target.title.split(',');
        let name = event.target.parentElement.title;
        let renderedStudents = (
            <React.Fragment key={"Student"}>
            <h1 className="overlayHeader">Students of: {name}</h1>
            <ul id="HomeStudentsUL" className="myUL">
                {this.RenderStudentList(students)}
            </ul>
            </React.Fragment> 
        );
        let overlayed = {
            overlay: true,
            body: renderedStudents
        }
        this.setState({overlayed:overlayed});
    }
    GetAdminBody = () =>
    {
        let areasBody = [];
        //let areasTable = this.GetAdminAreasTable();
        let areasTable = this.state.areas;
        if(this.state.areas[0] == null)
            this.FetchAdminAreasTable();
        for(let i=0;i<areasTable.length;i++)
        {
            let container = 
            {
                title: areasTable[i].name,
                body: (
                    <React.Fragment>
                    <p title={areasTable[i].name}>Created at {areasTable[i].created} 
                        <button title={areasTable[i].students.join(",")} className="neighboorOptions" onClick={this.showStudentsArea}>View Students</button>
                        <button title={areasTable[i].Id} onClick={this.GoEditArea} className="neighboorOptions">Edit Area</button>
                    </p>
                    <AreasTable table = {areasTable[i].subareas} showStudentsArea={this.showStudentsArea}/>
                    <button title={areasTable[i].Id} onClick={this.AddSubArea}>Add Sub-Area</button>
                    </React.Fragment>
                )
            }
            areasBody.push(container);
        }
        if(this.state.students[0]== null)
            this.FetchAdminStudentsTable();
        if(this.state.exams[0] == null)
            this.FetchAdminExamsTable();
        return [
            {
                title:"Exams",
                body : (
                    <React.Fragment>
                    <AdminExamTable table = {this.state.exams}/>
                    <button onClick={()=>window.location.assign('/admExam')}>Add new Exam</button> 
                    </React.Fragment>
                )
            },
            {
                title:"Students",
                body : (
                    <React.Fragment>
                     <AdminStudentTable table = {this.state.students}/>
                     <button onClick={()=>window.location.assign('/admStudent')}>Add new Student</button>
                    </React.Fragment>
                )
            },
            {
                title:"Areas",
                body:
                {
                    after:(
                        <React.Fragment> 
                        <hr/>
                        <button onClick={()=>window.location.assign('/admAreas')}>Add Area</button>
                        </React.Fragment>),
                    multi: areasBody
                },
            },
        ];
    }
}
 
export default AdminHome;
