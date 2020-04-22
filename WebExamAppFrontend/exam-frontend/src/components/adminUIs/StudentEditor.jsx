import React, { Component } from 'react'; 
import CustomCheckBoxes from '../smallComponents/CustomCheckBoxes';
import TextOverlayForm from '../smallComponents/TextOverlayForm';
class StudentEditor extends Component {
    state = {
        student: this.props.student,
        allAreas: [],
        loadingAreas: false,
        studentSubAreas: [],
        loadingSubAreas: false,
        overlayed : {
            overlay: false,
            extras : null,
            formType: "Text",
        },
    }
    renderStudent = () => 
    {
        let student = this.state.student;
        let areas = student.areas.join(', ');
        let subAreas = student.subareas.join(', ');
        let editButton = <button onClick= {this.handleEdit} className="edit">Edit</button>;
        let studentAttributes = (
        <React.Fragment key={"Student"}>
            <li id="Sname" title={student.name}><span className="etag">Name:</span> {student.name}{editButton}</li> 
            <li id="Susername" title={student.username}><span className="etag">Username:</span> {student.username}{editButton}</li>
            <li id="Sbirth" title={student.birth}><span className="etag">Birth:</span> {student.birth}{editButton}</li>  
            <li id="Semail" title={student.email}><span className="etag">Email:</span>{student.email}{editButton}</li> 
            <li id="Scontact" title={student.contact}><span className="etag">Contact number:</span>{student.contact}{editButton}</li> 
            <li id="Sareas" title={areas}><span className="etag">Areas:</span> {areas}{editButton}</li> 
            <li id="Ssubareas" title={subAreas}><span className="etag">Sub-Areas:</span> {subAreas}{editButton}</li> 
        </React.Fragment> 
            )
        return studentAttributes;
    }
    showActive = (event)=>
    {
        let student = this.state.student;
        if(!student.name || !student.username || !student.email ||
            student.areas.length<1 || student.subareas.length<1)
            alert("You need to fill all fields");
        else
        {
            let edit = 'true';
            if(this.props.new)
                edit='false';
            fetch('http://localhost:51061/api/EditStudent?edit='+edit,
            {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: student.Id,
                    name: student.name,
                    email: student.email,
                    username: student.username,
                    birth: student.birth,
                    active: student.active,
                    contact: student.contact,
                    areas: student.areas,
                    role: student.role,
                    subareas: student.subareas,
                    full_name: student.full_name
                })
            }).catch((e)=>{alert("Error, couldn't add or edit student")});
            alert("Student succesfully Edited");
            window.location.assign("/home");
        }
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    FetchAllAreas = () => 
    {
        fetch('http://localhost:51061/api/Areas?strings=true')
        .then(result=>result.json())
        .then((data)=>{
            this.setState({allAreas: data});
        })
        .catch((e)=>{
            console.log(e)});
        this.setState({loadingAreas: true});
    }
    FetchStudentSubAreas = ()=>
    {
        fetch('http://localhost:51061/api/SubAreas?studentAreas='+this.state.student.areas.join(","))
        .then(result=>result.json())
        .then((data)=>{
            this.setState({studentSubAreas: data});
        })
        .catch((e)=>{
            console.log(e)});
        this.setState({loadingSubAreas: true});
    }
  
    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            if(this.state.overlayed.formType == "areas" ||
            this.state.overlayed.formType == "subareas")
                return this.GetAreasOverlayForm();
            else if(this.state.overlayed.formType == "birth")
                return this.GetDateOverlayForm();
            else
                return this.GetTextOverlayForm();
        }
        else return null;
    }
    GetAreasCheckBoxes(currentArray, generalArray)
    {
       return <CustomCheckBoxes answers = {currentArray} 
       generalArray = {generalArray} handleCheckAnswer={this.handleCheckArea}/>;
    }
    handleCheckArea = (event) =>
    {
        let newStudent = this.state.student;
        let type = this.state.overlayed.formType;
        let areas = newStudent[type];
        if(event.target.checked)
        {
            /*
            if(areas.length == 1 && newStudent.role == "Teacher")
            {
                alert("Only 1 area admitted per teacher");
                return;
            }*/
            areas.push(event.target.value);
        }
        else
        {
            areas = areas.filter((value,index,arr)=>value!=event.target.value);
            if(type=="areas")
                newStudent["subareas"] = [];
        }
        newStudent[type]=areas;
        this.setState({student:newStudent});
        if(type=="areas" && this.state.student.areas[0]!=null)
            this.FetchStudentSubAreas();
    }

    GetAreasOverlayForm = () =>
    {
        let type = this.state.overlayed.formType;
        let currentAreas = this.state.student[type];
        let generalAreas;
        if (type=="areas")
        {
            generalAreas = this.state.allAreas;
        }
        else generalAreas = this.state.studentSubAreas;
        let checkBoxInputs = this.GetAreasCheckBoxes(currentAreas,generalAreas);
        return (
            <div className="overlayed">
            <form className = "elementEditForm" onSubmit={this.editAreas} >
                <h3>{this.state.overlayed.extras.placeholder+": "}</h3>
                <hr/>
                {checkBoxInputs}
                <button type="button" onClick= {this.cancelEdit}>Finish</button>
            </form>
            </div>
        );
    }
    GetTextOverlayForm = () =>
    {
        return (<TextOverlayForm editAction={this.editAction} overlayed = {this.state.overlayed} cancelEdit={this.cancelEdit}/>);
    }
    GetDateOverlayForm = () =>
    {
        return <TextOverlayForm editAction={this.editAction} overlayed = {this.state.overlayed} cancelEdit={this.cancelEdit} date={true}/>;
    }

    render() {  
        if(this.state.allAreas[0] == null && !this.state.loadingAreas)
        {
            this.FetchAllAreas();
        }
        if(this.state.studentSubAreas[0] == null && !this.state.loadingSubAreas && this.state.student.areas[0] != null)
        {
            this.FetchStudentSubAreas();
        }
        let overlay = this.GetOverlayForm();
        return (
            <React.Fragment>
                <ul className="myUL">
                    {this.renderStudent()}
                    <br/>
                    <button onClick={this.showActive}>Save Changes</button>
                </ul>
                {overlay}
            </React.Fragment>
          );
    }
    handleEdit = (event) =>
    {
        event.preventDefault();
        let element = event.target.parentElement;
        let placeholder = element.id.substr(1);
        placeholder= placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
        let id = element.id.substr(1); 
        let extras = {
            placeholder: placeholder,
            id: id,
            value: element.title,
            question: true
        };
        let formType = id;
        this.setState({overlayed: {
            overlay: true,
            extras:extras,
            formType: formType
        }});
        
    }
    editAction = (event) =>
    {
        event.preventDefault();
        let extras = this.state.overlayed.extras;
        let newStudent = this.state.student;
        newStudent[extras.id] = event.target.newValue.value;
        this.setState({student:newStudent})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
    }
}
 
export default StudentEditor;