import React, { Component } from 'react';
import Accordion from '../Accordion';
import StudentTable from '../tables/StudentExamTable'
import AreasTable from '../tables/SubAreasTable'

class StudentHome extends Component {
    state=
    {
        user:this.props.user,
        overlayed : 
        {
            overlay: false,
            body : null,
        },
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
            <h1>Welcome Student: {this.state.user.name}</h1>
            <Accordion accordions= {accordions}/>
            {overlay}
            </React.Fragment>
            );
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
    }

    GetStudentPastExamsTable = ()=>
    {
        //Replace by a fetch IT HAS TO HAVE THIS ATTRIBUTES
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
                    title: "Geometry-mod-3",
                    date: "5/10/2020",
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

    GetAdminExamsTable = ()=>
    {
        return(
            [
                {
                    title: "Algebra-1-Apr",
                    date: "4/16/2020",
                    area: "Math",
                    subarea: "Algebra",
                },
                {
                    
                    title: "Gemoetry-2-Apr",
                    date: "4/18/2020",
                    area: "Math",
                    subarea: "Geometry",
                },
                {
                    
                    title: "History-1-March",
                    date: "3/30/2020",
                    area: "History",
                    subarea: "World History",
                }
            ]
        );
    }

    /*
    GetAdminAreasTable = ()=>
    {
        return(
            [
                {
                    name: "Math",
                    created: "4/16/2020",
                    students: "Leandro Hurtado, Another Student",
                    subareas: [
                        {
                            name: "Geometry",
                            created: "2/16/2020",
                            students: "Leandro Hurtado, Another Student",
                        },
                        {
                            name: "Algebra",
                            created: "3/11/2020",
                            students: "Leandro Hurtado, Another Student",
                        },
                    ]
                },
                {
                    name: "History",
                    created: "4/27/2020",
                    students: "Leandro Hurtado",
                    subareas: [
                        {
                            name: "World History",
                            created: "2/8/2020",
                            students: "Leandro Hurtado",
                        }
                    ]
                },
            ]
        );
    }
    */
   GetStudentBody = () =>
    {
        return [
            {
                title: "Past Exams",
                body: (
                    <StudentTable table={this.GetStudentPastExamsTable()} /> 
                )
            },
            {
                title: "Comming Exams",
                body: (
                    <StudentTable table={this.GetStudentPastExamsTable()}/>
                )
            }
        ];
    }
    GetExamsBody = (examsTable) => 
    {
        let pastExamsBody = [];
        for(let i=0;i<examsTable.length;i++)
        {
            let container = 
            {
                title: examsTable[i].name,
                body: (
                    <React.Fragment>
                        <StudentTable table={examsTable[i].exams}/>
                    </React.Fragment>
                )
            }
            pastExamsBody.push(container);
        }
        return pastExamsBody;
    }

    GetNewStudentBody = () =>
    {
        let pastExamsTable = this.SortByArea(this.GetStudentPastExamsTable());
        let pastExamsBody = this.GetExamsBody(pastExamsTable);
        let commingExamsTable = this.SortByArea(this.GetStudentNextExamsTable());
        let commingExamsBody = this.GetExamsBody(commingExamsTable);
        
        return [
            {
                title:"Past Exams",
                body:
                {
                    multi: pastExamsBody
                },
            },
            {
                title:"Comming Exams",
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
    /*
    GetAdminBody = () =>
    { 
        let areasBody = [];
        let areasTable = this.GetAdminAreasTable();
        for(let i=0;i<areasTable.length;i++)
        {
            let container = 
            {
                title: areasTable[i].name,
                body: (
                    <React.Fragment>
                    <p title={areasTable[i].name}>Created at {areasTable[i].created} <button className="neighboorOptions" onClick={this.showStudentsAreas}>View Students</button><button onClick={this.GoEditArea} className="neighboorOptions">Edit Area</button></p>
                    <AreasTable table = {areasTable[i].subareas}/>
                    <button onClick={this.AddSubArea}>Add Sub-Area</button>
                    </React.Fragment>
                )
            }
            areasBody.push(container);
        }
        console.log(areasBody);
        return [
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
    }*/
}

/*Nested accordion example
body:
    {
    before: <p>EverySubArea <button>Edit</button></p>,
    title:("SubSubAreas"),
    body:(<p>This is a super nested area</p>),
    after:(<button>Add SubArea</button>)
    }
*/
 
export default StudentHome;