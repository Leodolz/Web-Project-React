import React, { Component } from 'react';
import MainPage from './UserController';
import Accordion from './Accordion';
import ResponsiveTable from './StudentExamTable'
import AdminExamTable from './AdminExamTable'
import AdminStudentTable from './AdminStudentTable'
import AreasTable from './AreasTable'

class Home extends Component {
    state={user:null}
    render() {
        let body = null;
        let role = '';
        if(this.state.user)
        {
            console.log(this.state.user);
            role= this.state.user.role;
            let accordions = this.state.user.role === "Admin"? 
            this.GetAdminBody():this.GetStudentBody(); 
            body = (
                <React.Fragment>
                <h1>Welcome {this.state.user.name}</h1>
                <Accordion accordions= {accordions}/>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
            <MainPage 
             GetGenAccFunction =  {this.GetGenAccFunc}
             role={role} 
             body={body} 
             home="active" 
             GetUser={this.GetUser}/>
            </React.Fragment>
          );
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
    }

    GetStudentExamsTable = ()=>
    {
        return(
            [
                {
                    title: "Algebra",
                    date: "3/26/2020",
                    score: "50/100"
                },
                {
                    title: "Geometry",
                    date: "3/27/2020",
                    score: "undefined"
                }
            ]
        );
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
    GetAdminStudentsTable = ()=>
    {
        return(
            [
                {
                    name: "Leandro Hurtado",
                    username: "leodolz",
                    email: "leo123f@somemail.com",
                    areas: "Math, History",
                    subareas: "Algebra, World History, Geometry",
                },
                
                {
                    name: "Another Student",
                    username: "genericStudent",
                    email: "gen324@somemail.com",
                    areas: "Math",
                    subareas: "Algebra, Geometry",
                },
            ]
        );
    }
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


    GetStudentBody = () =>
    {
        return [
            {
                title: "Past Exams",
                body: (
                    <ResponsiveTable table={this.GetStudentExamsTable()} /> 
                )
            },
            {
                title: "Comming Exams",
                body: (
                    <ResponsiveTable table={this.GetStudentExamsTable()}/>
                )
            }
        ];
    }

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
                    <p>Created at {areasTable[i].created} <button>View Students</button><button className="neighboorOptions">Edit Area</button></p>
                    <AreasTable table = {areasTable[i].subareas}/>
                    <button>Add Sub-Area</button>

                    </React.Fragment>
                )
            }
            areasBody.push(container);
        }
        console.log(areasBody);
        return [
            {
                title:"Exams",
                body : (
                    <React.Fragment>
                    <AdminExamTable table = {this.GetAdminExamsTable()}/>
                    <button onClick={()=>window.location.assign('/admExam')}>Add new Exam</button> 
                    </React.Fragment>
                )
            },
            {
                title:"Students",
                body : (
                    <React.Fragment>
                     <AdminStudentTable table = {this.GetAdminStudentsTable()}/>
                     <button>Add new Student</button>
                    </React.Fragment>
                )
            },
            {
                title:"Areas",
                body:
                {
                    multi: areasBody
                },
            },
        ];
    }
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
 
export default Home;