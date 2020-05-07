import React, { Component } from 'react';
import Accordion from '../Accordion';
import AdminExamTable from '../tables/AdminExamTable'
import AdminStudentTable from '../tables/AdminStudentTable'
import SubAreasTable from '../tables/SubAreasTable'
import HorizontalTabs from '../HorizontalTabs';

class TeacherHome extends Component {
    state=
    {
        user:this.props.user,
        overlayed : 
        {
            overlay: false,
            body : null,
        },
        pastExams: null,
        comingExams: null,
        subAreas: [],
        students: null,
        done: false,
    }
    constructor(props)
    {
        super(props);
        document.title = "Teacher Home";
        let userId = props.user.Id;
        this.FetchGenericTable('SubAreas/'+userId+'?action=GetSubAreas','subAreas');
        this.FetchGenericTable('StudentExams/'+userId+'?time=future','comingExams');
        this.FetchGenericTable('StudentExams/'+userId+'?time=pastAdmin','pastExams');
        this.FetchGenericTable('Students?subAreaId='+userId+'&role=Student','students');
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
        let teacherBody = this.GetTeacherHomeBody();
        return (
            <React.Fragment>
            {teacherBody}
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

    
    SortByArea = (examsTable) =>
    {
        let sortedAreas = [];
        for(let i=0;i<examsTable.length;i++)
        {
            let examItem = examsTable[i];
            if(sortedAreas.find(areaItem => areaItem.name==examItem.subarea)==null)
            {
                let areaItem = {name:examItem.subarea,exams:[]}
                for(let j=0;j<examsTable.length;j++)
                {
                    if(examsTable[j].subarea == areaItem.name)
                        areaItem.exams.push(examsTable[j]);
                }
                sortedAreas.push(areaItem);
            }
        }
        return sortedAreas;
    }
    SortStudentsByArea = (studentsTable) =>
    {
        let sortedAreas = this.state.subAreas;
        let newArray = [];
        for(let i=0;i<sortedAreas.length;i++)
        {
            let newItem = {name: sortedAreas[i].name,students:[]};
            for(let j=0;j<studentsTable.length;j++)
            {
                let studentItem = studentsTable[j];
                if(studentItem.subareas.find(subarea => subarea.name==sortedAreas[i].name)==null)
                {
                    newItem.students.push(studentItem);
                }
            }
            newArray.push(newItem);
            
        }
        return newArray;
    }

    GetItemBody(students,tableElement,past)
    {
        if(students)
            return (
                <>
                    <AdminStudentTable teacher={true} table = {tableElement.students}/>
                    <button title={tableElement.name} onClick={(event)=>
                    {
                        sessionStorage.setItem('URole',"Student");
                        sessionStorage.setItem('USubArea', event.target.title);
                        window.location.assign('/admStudent')
                    }
                    }>Add new Student</button>
                </>
            );
        else return <AdminExamTable table={tableElement.exams} past={past}/>;

    }

    GetTabBody = (dataArray, students, past) => 
    {
        let tabContentBody = [];
        if(dataArray.length<1)
            return <h1>Empty tables</h1>
        for(let i=0;i<dataArray.length;i++)
        {
            let bodyItem = this.GetItemBody(students,dataArray[i], past);
            let container = 
            {
                title: dataArray[i].name,
                body: (
                    <React.Fragment>
                       {bodyItem}
                    </React.Fragment>
                )
            }
            tabContentBody.push(container);
        }
        return  <Accordion accordions= {tabContentBody}/>;
    }

    GetTeacherHomeBody = () =>
    {
        if(this.state.students == null || this.state.comingExams == null || this.state.pastExams == null)
            return <h1>Loading..</h1>
        let pastExamsTable = this.SortByArea(this.state.pastExams);
        let pastExamsBody = this.GetTabBody(pastExamsTable,false, true);
        let comingExamsTable = this.SortByArea(this.state.comingExams);
        let comingExamsBody = this.GetTabBody(comingExamsTable,false, false);
        comingExamsBody = (<>
            {comingExamsBody}
            <button onClick={()=>window.location.assign('/admExam')}>Add new Exam</button>
        </>);
        let studentsTable = this.SortStudentsByArea(this.state.students);
        let studentsBody = this.GetTabBody(studentsTable,true, false);
        let subAreasBody = <SubAreasTable table = {this.state.subAreas}/>;
        let allTabs = [
            {id: 0, title: "Past Exams", body: pastExamsBody},
            {id: 1,title: "Coming Exams", body: comingExamsBody},
            {id: 2,title: "Students", body: studentsBody},
            {id: 3, title: "Sub Areas", body: subAreasBody}
        ];
        return (
            <HorizontalTabs allTabs= {allTabs} default={2}/>
        );

    }
}
 
export default TeacherHome;