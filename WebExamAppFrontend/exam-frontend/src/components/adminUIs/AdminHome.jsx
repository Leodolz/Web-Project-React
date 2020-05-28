import React, { Component } from 'react';
import Accordion from '../Accordion';
import AdminExamTable from '../tables/AdminExamTable'
import AdminStudentTable from '../tables/AdminStudentTable'
import SubAreasTable from '../tables/SubAreasTable'
import HorizontalTabs from '../HorizontalTabs';
import {API_URL} from '../Globals';

class AdminHome extends Component {
    state=
    {
        user:this.props.user,
        overlayed : 
        {
            overlay: false,
            body : null,
        },
        students : null,
        areas: null,
        exams: null,
        teachers: null
    }
    constructor(props)
    {
        super(props);
        document.title = "Admin Home";
        this.FetchGenericTable("Areas","areas");
        this.FetchGenericTable("Exams","exams");
        this.FetchGenericTable("Students/subAreaId=0&role=Student","students");
        this.FetchGenericTable("Students/subAreaId=0&role=Teacher","teachers");
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
        const {exams, teachers, students, areas} = this.state;
        if(exams == null || teachers == null || students == null || areas == null)
            return(<h1>Loading page...</h1>)
        let tabs = this.GetAdminBody();
        let adminView = null;
        if(this.state.admins)
            adminView = <button 
            onClick={this.showAdminsList}
            title={this.state.admins.join(",")}>
                View Admins</button>;
        return (
            <React.Fragment>
                <button 
                onClick={()=>{
                    sessionStorage.setItem('URole',"Admin");
                    window.location.assign('/admStudent')
                    }}>
                    Add Admin
                </button>
                {adminView}
            <br/>
            {tabs}
            {overlay}
            </React.Fragment>
            );
    }
    handleAddStudent = (event) =>
    {
        let extras = {placeholder: "Available Students:"};
        this.setState({overlayed: {
            overlay: true,
            extras:extras,
            formType: "studentsObj"
        }});
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
    }

    FetchGenericTable = (url,stateVariable) =>
    {
        let context = this;
        fetch(API_URL+url)
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
        fetch(API_URL+'Students/'
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
        this.fetchSubAreaById(event.target.title);
        window.location.assign("/admSubAreas");
    }
    fetchSubAreaById(id)
    {
        fetch(API_URL+'SubAreas/'+id+"&action=SetParentArea")
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }

    fetchAreaById(id)
    {
        fetch(API_URL+'Areas/'+id)
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
    GetAreasAccordions = () =>
    {
        if(this.state.loadedAccordions)
            return this.state.loadedAccordions;
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
                        <button title={areasTable[i].id} onClick={this.GoEditArea} className="neighboorOptions">Edit Area</button>
                    </p>
                    <SubAreasTable table = {areasTable[i].subareas} showStudentsArea={this.showStudentsArea} admin={true}/>
                    <button title={areasTable[i].id} onClick={this.AddSubArea}>Add Sub-Area</button>
                    </React.Fragment>
                )
            }
            areasBody.push(container);
        }
        this.setState({loadedAccordions: areasBody});
        return areasBody;
    }
    GetAdminBody = () =>
    {
        let areasBody = 
        <>
            <Accordion accordions ={this.GetAreasAccordions()}/>
            <button onClick={()=>window.location.assign('./admAreas')}>Add Area</button>
        </>
        let examsBody = 
            <>
                <AdminExamTable table = {this.state.exams}/>
                <button onClick={()=>window.location.assign('/admExam')}>Add new Exam</button> 
            </>
        let studentsBody =
            <>
                <AdminStudentTable table = {this.state.students} role="Student"/>
                <button onClick={()=>{
                    sessionStorage.setItem('URole',"Student");
                    window.location.assign('/admStudent')
                    }}>Add new Student</button>
            </>;
        let teachersBody = 
            <>
                <AdminStudentTable table = {this.state.teachers} role="Teacher"/>
                    <button onClick={()=>{
                        sessionStorage.setItem('URole',"Teacher");
                        window.location.assign('/admStudent');
                        }}>Add new Teacher</button>
            </>
        let allTabs = [
            {id: 0, title: "Exams", body: examsBody},
            {id: 1,title: "Students", body: studentsBody},
            {id: 2,title: "Teachers", body: teachersBody},
            {id: 3,title: "Areas", body: areasBody},
        ];
        return (
            <HorizontalTabs allTabs= {allTabs} default={0}/>
        );
    }
}
 
export default AdminHome;
