import React, { Component } from 'react';
import Accordion from '../Accordion';
import AdminExamTable from '../tables/AdminExamTable'
import AdminStudentTable from '../tables/AdminStudentTable'
import AreasTable from '../tables/SubAreasTable'

class TeacherHome extends Component {
    state=
    {
        user:this.props.user,
        overlayed : 
        {
            overlay: false,
            body : null,
        },
        pastExams: [],
        commingExams: [],
        subAreas: [],
        students: [],
        done: false,
    }
    constructor(props)
    {
        super(props);
        this.FetchCommingExamsTable(props.user.Id);
        this.FetchStudentsTable(props.user.Id);
        this.FetchPastExamsTable(props.user.Id);
        this.fetchSubAreasById(props.user.Id);
    }
    fetchSubAreasById(id)
    {
        let context= this;
        fetch('http://localhost:51061/api/SubAreas/'+id+
            '?action=GetSubAreas')
        .then(result=>result.json())
        .then((data)=>{
            context.setState({subAreas:data});
        })
        .catch((e)=>console.log);
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
        let accordions = this.GetNewStudentBody();
        return (
            <React.Fragment>
            <h1>Welcome Teacher {this.state.user.username}</h1>
            <br/>
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
    FetchPastExamsTable = (id) =>
    {
        let context = this;
        fetch('http://localhost:51061/api/StudentExams/'+id+
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
    FetchCommingExamsTable = (id) =>
    {
        let context = this;
        fetch('http://localhost:51061/api/StudentExams/'+id+
        '?time=future')
        .then(result=>result.json())
        .then((data)=>{
            context.setState({commingExams: data});
            console.log(data);
        })
       .catch((e)=>{
        alert("No exams found");
        console.log(e);
        });
    }
    FetchStudentsTable = (id)=>
    {
        let context = this;
        fetch('http://localhost:51061/api/Students?subAreaId='
        +id+'&students=true')
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

    GetExamsBody = (examsTable, students) => 
    {
        let pastExamsBody = [];
        
        for(let i=0;i<examsTable.length;i++)
        {
            let bodyItem = <AdminExamTable table={examsTable[i].exams}/>
            if(students==true)
            {
                bodyItem = (<AdminStudentTable table = {examsTable[i].students}/>);
            }
            let container = 
            {
                title: examsTable[i].name,
                body: (
                    <React.Fragment>
                       {bodyItem}
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
        let commingExamsTable = this.SortByArea(this.state.commingExams);
        let commingExamsBody = this.GetExamsBody(commingExamsTable,false);
        let studentExamsTable = this.SortStudentsByArea(this.state.students);
        let studentExamsBody = this.GetExamsBody(studentExamsTable,true);
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
                    multi: commingExamsBody,
                    after: (<button onClick={()=>window.location.assign('/admExam')}>Add new Exam</button> ),
                },
               
            },
            {
                title:"Students",
                body:
                {
                    multi: studentExamsBody,
                    after: <button onClick={()=>{
                        sessionStorage.setItem('URole',"Student");
                        window.location.assign('/admStudent')
                        }}>Add new Student</button>
                }
            }
        ];

    }
    GetTeacherBody = () =>
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
                    <AreasTable table = {areasTable[i].subareas} />
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
                     <AdminStudentTable table = {this.state.students}/>
                     <button onClick={()=>{
                         sessionStorage.setItem('URole',"Student");
                         window.location.assign('/admStudent')
                         }}>Add new Student</button>
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
 
export default TeacherHome;