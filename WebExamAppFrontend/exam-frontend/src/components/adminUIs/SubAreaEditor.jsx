import React, { Component } from 'react'; 

class SubAreaEditor extends Component {
    state = {
        subArea: this.props.subArea,
        allStudents: null,
        overlayed : {
            overlay: false,
            extras : null,
            formType: "Text",
        },
    }
    constructor(props)
    {
        super(props);
        document.title = "Sub Area Editor";
        this.FetchAllStudents();
    }
    hideComponent = (event)=>
    {
        let elementId = event.target.parentElement.id;
        let newArea = this.state.subArea;
        let newarray = this.state.subArea.studentsObj.slice();
        newarray = newarray.filter((value,index)=>{ return index!=elementId});
        newArea.studentsObj = newarray;
        this.setState({subArea:newArea});
    }

    renderStudents = () =>
    {
        let studentsList = [];
        
        let students = this.state.subArea.studentsObj.slice();
        for(let i=0;i<students.length;i++)
        {
            let editButton = <button title={students[i].Id} onClick= {this.studentEdit} className="edit">Edit</button>;
            let student = (<li key={i} title="studentsObj" id={i}><span className="etag">{(i+1)+". "}</span>{students[i].full_name}{editButton}</li>);
            studentsList.push(student);
        }
        return studentsList;
    }

    renderSubArea = () => 
    {
        let subArea = this.state.subArea;
        let editButton = <button onClick= {this.handleEdit} className="edit">Edit</button>;
        let studentAttributes = (
        <React.Fragment key={"Student"}>
            <li id="Sname" title={subArea.name}><span className="etag">Name:</span> {subArea.name}{editButton}</li> 
            <h3>Students: </h3>
            <ul className="myUL">
                {this.renderStudents()}
                <button onClick={this.handleAddStudent}>Manage Existing</button>
            </ul>
            <hr/>
        </React.Fragment> 
            )
        return studentAttributes;
    }
    studentEdit = (event) =>
    {
        this.fetchStudentById(event.target.title);
        window.location.assign('/admStudent');
    }
    fetchStudentById(id)
    {
        fetch('http://localhost:51061/api/Students/'+id)
        .then(result=>result.json())
        .then((data)=>{

        })
        .catch(console.log);
    }
    showActive = (event)=>
    {
        if(this.state.subArea.name==null)
        {
            alert("You need to fill name field!");
            return;
        }
        let edit = 'true';
        if(this.props.new)
        {
            edit= 'false';
        }
        fetch('http://localhost:51061/api/EditSubArea?edit='+edit,
        {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.subArea)
        }).catch((e)=>{alert("Error, couldn't add or edit student")});
        alert("SubArea succesfully Edited");
        window.location.assign("/home");
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    
    FetchAllStudents =()=>
    {
        let context = this;
        fetch('http://localhost:51061/api/Students?subAreaId=0&role=Student')
        .then(result=>result.json())
        .then((data)=>{
            context.setState({allStudents: data});
            console.log(data);
        })
       .catch((e)=>{
        alert("No students found");
        console.log(e);
        });
    }
   
    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            if(this.state.overlayed.formType == "studentsObj")
                return this.GetStudentsOverlayForm();
            else
                return this.GetTextOverlayForm();
        }
        else return null;
    }
    GetAreasCheckBoxes(currentArray, generalArray)
    {
        let checkboxes = [];
        for(let i=0; i<generalArray.length; i++)
        {
            let isChecked = currentArray.find((student)=>student.email==generalArray[i].email) != null;
            checkboxes.push(
            <label key={i+"Chk"} className="checkContainer">
            <input type="checkbox" defaultChecked={isChecked}
                value ={generalArray[i].username} onClick={this.handleCheckClick} onChange={this.handleCheckArea} />
            <div className="TagContainer" key={"Div"+i}>
                <span className="CheckBoxTag">{generalArray[i].name}({generalArray[i].username})</span>
            </div>
            <span className="checkmark"></span>
            <br/>
            </label>)
        }
        return checkboxes;
    }
    handleCheckArea = (event) =>
    {
        let newSubArea = this.state.subArea;
        let type = this.state.overlayed.formType;
        let students = newSubArea[type];
        if(event.target.checked)
        {
            let allStudents = this.state.allStudents.slice();
            let student = allStudents.find((item)=>item.username==event.target.value)
            students.push(student);
        }
        else
        {
            students = students.filter((value,index,arr)=>value.username!=event.target.value);
        }
        newSubArea[type]=students;
        this.setState({area:newSubArea});
    }

    GetStudentsOverlayForm = () =>
    {
        let type = this.state.overlayed.formType;
        let currentStudents = this.state.subArea[type];
        let generalStudents = this.state.allStudents;
        let checkBoxInputs = this.GetAreasCheckBoxes(currentStudents,generalStudents);
        return (
            <div className="overlayedHome">
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
        return (
            <div className="overlayedHome">
            <form className = "elementEditForm" onSubmit={this.addAction} >
                <span className="putLeft">{this.state.overlayed.extras.placeholder+": "}</span>
                <textarea rows="1" name="newValue" defaultValue={this.state.overlayed.extras.value} type="text" className="myInput" placeholder={this.state.overlayed.extras.placeholder +"..."} required/>
                <button type="submit">Save changes</button>
                <button type="button" onClick= {this.cancelEdit}>Cancel</button>
            </form>
            </div>
        );
    }
    
    render() {  
        let overlay = this.GetOverlayForm();
        return (
            <React.Fragment>
                <ul className="myUL">
                    {this.renderSubArea()}
                    <br/>
                    <button onClick={this.showActive}>Save Changes</button>
                </ul>
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
    getFirstCapitalized=(word) =>
    {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    handleEdit = (event) =>
    {
        event.preventDefault();
        let element = event.target.parentElement;
        let placeholder = element.id.slice(1);
        placeholder= this.getFirstCapitalized(placeholder);
        let id = element.id.slice(1);
        let extras = {
            placeholder: placeholder,
            id: id,
            value: element.title
        };
        let formType = id;
        this.setState({overlayed: {
            overlay: true,
            extras:extras,
            formType: formType
        }});
    }

    addAction = (event) =>
    {
        event.preventDefault();
        let extras = this.state.overlayed.extras;
        let newSubArea = this.state.subArea;
        newSubArea[extras.id] = event.target.newValue.value;
        this.setState({subArea:newSubArea})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
    }
}
 
export default SubAreaEditor;