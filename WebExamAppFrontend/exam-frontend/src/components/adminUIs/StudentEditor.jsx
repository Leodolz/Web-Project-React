import React, { Component } from 'react'; 
import CustomCheckBoxes from '../smallComponents/CustomCheckBoxes';
import TextOverlayForm from '../smallComponents/TextOverlayForm';
class StudentEditor extends Component {
    state = {
        student: this.props.student,
        overlayed : {
            overlay: false,
            extras : null,
            formType: "Text",
        },
    }
    renderStudent = () => 
    {
        let student = this.props.student;
        if(student == null)
            return <p>Loading student...</p>;
        let areas = student.areas.join(', ');
        let subAreas = student.subareas.join(', ');
        let editButton = <button onClick= {this.handleEdit} className="edit">Edit</button>;
        let studentAttributes = (
        <React.Fragment key={"Student"}>
            <li id="Sname" title={student.name}><span className="etag">Name:</span> {student.name}{editButton}</li> 
            <li id="Susername" title={student.username}><span className="etag">Username:</span> {student.username}{editButton}</li>  
            <li id="Semail" title={student.email}><span className="etag">Email:</span>{student.email}{editButton}</li> 
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
           console.log(this.state.student);
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    GetAllAreas = () =>
    {
        //Fetch for all areas
        return [
            "Math",
            "History",
            "Extra",
        ];
    }
    GetStudentSubAreas = () =>
    {
        //Fetch for subAreas inside areas
        return [
            "Algebra",
            "World History",
            "Geometry",
            "US Civil War",
            "Calculus I",
            "Sub-Extra"
        ];
    }
    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            if(this.state.overlayed.formType == "areas" ||
            this.state.overlayed.formType == "subareas")
                return this.GetAreasOverlayForm();
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
            areas.push(event.target.value);
        }
        else
        {
            areas = areas.filter((value,index,arr)=>value!=event.target.value);
        }
        newStudent[type]=areas;
        this.setState({student:newStudent});
    }

    GetAreasOverlayForm = () =>
    {
        let type = this.state.overlayed.formType;
        let currentAreas = this.state.student[type];
        let generalAreas = type=="areas"?this.GetAllAreas():this.GetStudentSubAreas();
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

    render() {  
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