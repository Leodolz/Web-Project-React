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
        exams: [],
        teachers: []
    }
    constructor(props)
    {
        super(props);
        this.FetchGenericTable("Areas","areas");
        this.FetchGenericTable("Exams","exams");
        this.FetchGenericTable("Students?subAreaId=0&role=Student","students");
        this.FetchGenericTable("Students?subAreaId=0&role=Teacher","teachers");
        this.FetchAdmins();
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
        let accordions = this.GetAdminBody();
        let adminView = null;
        if(this.state.admins)
            adminView = <button 
            onClick={this.showAdminsList}
            title={this.state.admins.join(",")}>
                View Admins</button>;
        return (
            <React.Fragment>
            <h1>Welcome Admin {this.state.user.username}</h1>
            <br/>
                <button 
                onClick={()=>{
                    sessionStorage.setItem('URole',"Admin");
                    window.location.assign('/admStudent')
                    }}>
                    Add Admin
                </button>
                {adminView}
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

    FetchGenericTable = (url,stateVariable) =>
    {
        let context = this;
        fetch('http://localhost:51061/api/'+url)
        .then(result=>result.json())
        .then((data)=>{
            context.setState({[stateVariable]: data});
        })
       .catch((e)=>{
        alert("No students found");
        console.log(e);
        });
    }
    GetAdminsNames = (adminArray)=>
    {
        let namesArray = [];
        for(let i=0;i<adminArray.length;i++)
        {
            namesArray.push(adminArray[i].full_name+" ("+adminArray[i].username+") ")
        }
        return namesArray;
    }
    FetchAdmins = ()=>
    {
        let context = this;
        fetch('http://localhost:51061/api/Students?'
        +'subAreaId=0&role=Admin')
        .then(result=>result.json())
        .then((data)=>{
            let admins = context.GetAdminsNames(data);
            context.setState({admins: admins});
            console.log(data);
        })
       .catch((e)=>{
        alert("No students found");
        console.log(e);
        });
    }

    AddSubArea = (event) =>
    {
        event.preventDefault();
        this.fetchSubAreaById(event.target.title);
        //window.location.assign("/admSubAreas");
    }
    fetchSubAreaById(id)
    {
        fetch('http://localhost:51061/api/SubAreas/'+id+
            '?action=SetParentArea')
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
    showAdminsList=(event)=>
    {
        let admins = event.target.title.split(',');
        let renderedAdmins = (
            <React.Fragment key={"Student"}>
            <h1 className="overlayHeader">Admins:</h1>
            <ul id="HomeStudentsUL" className="myUL">
                {this.RenderStudentList(admins)}
            </ul>
            </React.Fragment> 
        );
        let overlayed = {
            overlay: true,
            body: renderedAdmins
        }
        this.setState({overlayed:overlayed});
    }
    showStudentsArea = (event) =>
    {

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
        let areasTable = this.state.areas;
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
                     <AdminStudentTable table = {this.state.students} role="Student"/>
                     <button onClick={()=>{
                         sessionStorage.setItem('URole',"Student");
                         window.location.assign('/admStudent')
                         }}>Add new Student</button>
                    </React.Fragment>
                )
            },
            {
                title:"Teachers",
                body : (
                    <React.Fragment>
                     <AdminStudentTable table = {this.state.teachers} role="Teacher"/>
                     <button onClick={()=>{
                         sessionStorage.setItem('URole',"Teacher");
                         window.location.assign('/admStudent');
                         }}>Add new Teacher</button>
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
