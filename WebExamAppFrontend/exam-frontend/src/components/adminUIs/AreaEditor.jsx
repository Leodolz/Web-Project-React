import React, { Component } from 'react';

class AreaEditor extends Component {
    state = {
        area: this.props.area,
        availableSubAreas: null,
        overlayed : 
        {
            overlay: false,
            extras : null,
            formType: "Text",
        },
    }
  

    renderSubAreas = () =>
    {
        let subAreasList = [];
        let editButton = <button onClick= {this.subAreaEdit} className="edit">Edit</button>;
        let subAreas = this.state.area.subareas;
        for(let i=0;i<subAreas.length;i++)
        {
            let subArea = (<li key={i} title={subAreas[i].Id} id={i}><span className="etag">{(i+1)+". "}</span>{subAreas[i].name}{editButton}</li>);
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
            </ul>
            <br/>
            <button>Add Sub-Area</button>
            <hr/>
        </React.Fragment> 
            )
        return studentAttributes;
    }
    subAreaEdit = (event) =>
    {
        console.log(event.target.parentElement.title);
        this.fetchSubAreaById(event.target.parentElement.title);
        
    }
    fetchSubAreaById(id)
    {
        fetch('http://localhost:51061/api/SubAreas/'+id)
        .then(result=>result.json())
        .then((data)=>{
            window.location.assign('/admSubAreas');
        })
        .catch(console.log);
    }
    showActive = (event)=>
    {
        if(this.state.area.name==null)
        {
            alert("You need to fill name field!");
            return;
        }
        let edit = 'true';
        if(this.props.new)
            edit= 'false';
        fetch('http://localhost:51061/api/EditArea?edit='+edit,
        {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: this.state.area.Id,
                name: this.state.area.name
            })
        }).catch((e)=>{alert("Error, couldn't add or edit student")});
        alert("Student succesfully Edited");
        window.location.assign("/home");
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            return this.GetTextOverlayForm();
        }
        else return null;
    }
   
    GetTextOverlayForm = () =>
    {
        return (
            <div className="overlayed">
            <form className = "elementEditForm" onSubmit={this.editAction} >
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