import React, { Component } from 'react';
import Accordion from '../Accordion';
import AdminExamTable from '../tables/AdminExamTable'
import AdminStudentTable from '../tables/AdminStudentTable'

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
        document.title = "Teacher Home";
        let userId = props.user.Id;
        this.FetchGenericTable('SubAreas/'+userId+'?action=GetSubAreas','subAreas');
        this.FetchGenericTable('StudentExams/'+userId+'?time=future','commingExams');
        this.FetchGenericTable('Students?subAreaId='+userId+'&role=Student','students');
        this.FetchGenericTable('StudentExams/'+userId+'?time=past','pastExams');
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
        let accordions = this.GetTeacherHomeBody();
        return (
            <React.Fragment>
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
                bodyItem = (
                    <React.Fragment>
                        <AdminStudentTable teacher={true} table = {examsTable[i].students}/>
                        <button title={examsTable[i].name} onClick={(event)=>
                        {
                            sessionStorage.setItem('URole',"Student");
                            sessionStorage.setItem('USubArea', event.target.title);
                            window.location.assign('/admStudent')
                        }
                        }>Add new Student</button>
                        
                    </React.Fragment>
                    );
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

   

    GetTeacherHomeBody = () =>
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
                }
            }
        ];

    }
}
 
export default TeacherHome;