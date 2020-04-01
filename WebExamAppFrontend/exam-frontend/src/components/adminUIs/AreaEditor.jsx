import React, { Component } from 'react';

class AreaEditor extends Component {
    state = {
        area: 
            {
                name: "Math",
                subareas: ["Algebra","Geometry"],
            },
        overlayed : 
        {
            overlay: false,
            extras : null,
            formType: "Text",
        },
    }
    hideComponent = (event)=>
    {
        let elementId = event.target.parentElement.id;
        let newArea = this.state.area;
        let newarray = this.state.area.subareas.slice();
        newarray = newarray.filter((value,index)=>{ return index!=elementId});
        newArea.subareas = newarray;
        this.setState({area:newArea});
    }

    renderSubAreas = () =>
    {
        let subAreasList = [];
        let editButton = <button onClick= {this.subAreaEdit} className="edit">Edit</button>;
        let subAreas = this.state.area.subareas;
        for(let i=0;i<subAreas.length;i++)
        {
            let subArea = (<li key={i} title="subareas" id={i}><span className="etag">{(i+1)+". "}</span>{subAreas[i]}{editButton}</li>);
            subAreasList.push(subArea);
        }
        return subAreasList;
    }

    renderArea = () => 
    {
        let area = this.state.area;
        let editButton = <button onClick= {this.handleEdit} className="edit">Edit</button>;
        let studentAttributes = (
        <React.Fragment key={"Student"}>
            <li id="Sname" title={area.name}><span className="etag">Name:</span> {area.name}{editButton}</li> 
            <h3>Sub-Areas: </h3>
            <ul className="myUL">
                {this.renderSubAreas()}
                <button onClick={this.handleAddArea}>Manage Existing</button>
            </ul>
            <hr/>
        </React.Fragment> 
            )
        return studentAttributes;
    }
    subAreaEdit = () =>
    {
        //Request For SubArea
        window.location.assign('/admSubAreas');
    }
    showActive = (event)=>
    {
        console.log(this.state.area);
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    GetAvailableSubAreas = () =>
    {
        return [
            "Algebra",
            "Geometry",
            "Calculus I",
            "Trigonometry",
            "Analytic Geometry"
        ];
    }
    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            if(this.state.overlayed.formType == "subareas")
                return this.GetAreasOverlayForm();
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
            let isChecked = currentArray.find((area)=>area==generalArray[i]) != null;
            checkboxes.push(<label key={i+"Chk"} className="checkContainer"><input type="checkbox" defaultChecked={isChecked}
            value ={generalArray[i]} onClick={this.handleCheckClick} onChange={this.handleCheckArea} />{generalArray[i]}<span className="checkmark"></span><br/></label>)
        }
        return checkboxes;
    }
    handleCheckArea = (event) =>
    {
        let newArea = this.state.area;
        let type = this.state.overlayed.formType;
        let areas = newArea[type];
        if(event.target.checked)
        {
            areas.push(event.target.value);
        }
        else
        {
            areas = areas.filter((value,index,arr)=>value!=event.target.value);
        }
        newArea[type]=areas;
        this.setState({area:newArea});
    }

    GetAreasOverlayForm = () =>
    {
        let type = this.state.overlayed.formType;
        let currentAreas = this.state.area[type];
        let generalAreas = this.GetAvailableSubAreas();
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
            <form className = "elementEditForm" onSubmit={this.editAction} >
                <span className="putLeft">{this.state.overlayed.extras.id+": "}</span>
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
                    {this.renderArea()}
                    <br/>
                    <button onClick={this.showActive}>Save Changes</button>
                </ul>
                {overlay}
            </React.Fragment>
          );
    }
    handleAddArea = (event) =>
    {
        let extras = {placeholder: "Available Sub-Areas"};
        this.setState({overlayed: {
            overlay: true,
            extras:extras,
            formType: "subareas"
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
        let placeholder = element.title;
        placeholder= this.getFirstCapitalized(placeholder);
        let id = element.id.slice(1);
        id =  this.getFirstCapitalized(id);
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

    editAction = (event) =>
    {
        event.preventDefault();
        let extras = this.state.overlayed.extras;
        let newArea = this.state.area;
        newArea[extras.id] = event.target.newValue.value;
        this.setState({area:newArea})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
    }
}
 
export default AreaEditor;