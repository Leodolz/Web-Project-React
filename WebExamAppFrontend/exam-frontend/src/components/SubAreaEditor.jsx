import React, { Component } from 'react'; 

class SubAreaEditor extends Component {
    state = {
        subArea: 
            {
                name: "Math",
                students: 
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
                    {
                        name: "Bob Doole",
                        username: "genericStudent2",
                        email: "gen12324@somemail.com",
                        areas: "History",
                        subareas: "Algebra, Geometry, Calculus I",
                    },
                ],
            },
        overlayed : {
            overlay: false,
            extras : null,
            formType: "Text",
        },
    }
    hideComponent = (event)=>
    {
        let elementId = event.target.parentElement.id;
        let newArea = this.state.subArea;
        let newarray = this.state.subArea.students.slice();
        newarray = newarray.filter((value,index)=>{ return index!=elementId});
        newArea.students = newarray;
        this.setState({subArea:newArea});
    }

    renderStudents = () =>
    {
        let studentsList = [];
        let editButton = <button onClick= {this.studentEdit} className="edit">Edit</button>;
        let students = this.state.subArea.students;
        for(let i=0;i<students.length;i++)
        {
            let student = (<li key={i} title="students" id={i}><span className="etag">{(i+1)+". "}</span>{students[i].name}{editButton}</li>);
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
    studentEdit = () =>
    {
        //Request For SubArea
        window.location.assign('/admStudent');
    }
    showActive = (event)=>
    {
        console.log(this.state.subArea);
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    GetAvailableStudents = () =>
    {
        return [
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
            {
                name: "Bob Doole",
                username: "genericStudent2",
                email: "gen12324@somemail.com",
                areas: "History",
                subareas: "Algebra, Geometry, Calculus I",
            },
            {
                name: "Joaquin",
                username: "genericStudent3",
                email: "gen12222324@somemail.com",
                areas: "History",
                subareas: "World History, Geometry, Calculus I",
            },
            {
                name: "John Osmont",
                username: "genericStudent4",
                email: "gen1222232224@somemail.com",
                areas: "History",
                subareas: "World History, Geometry, Calculus I",
            }
        ];
    }
    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            if(this.state.overlayed.formType == "students")
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
            checkboxes.push(<label key={i+"Chk"} className="checkContainer"><input type="checkbox" defaultChecked={isChecked}
            value ={generalArray[i].username} onClick={this.handleCheckClick} onChange={this.handleCheckArea} /><div className="TagContainer" key={"Div"+i}><span className="CheckBoxTag">{generalArray[i].username}({generalArray[i].name})</span></div><span className="checkmark"></span><br/></label>)
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
            let student = this.GetAvailableStudents().find((item)=>item.username==event.target.value)
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
        let currentAreas = this.state.subArea[type];
        let generalAreas = this.GetAvailableStudents();
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
        return (
            <div className="overlayed">
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
            formType: "students"
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