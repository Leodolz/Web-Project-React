import React, { Component } from 'react';

class TextOverlayForm extends Component {
    state = {  }
    render() { 
        let list = null;
        let okButton = null;
        let body = null;
        let saveOrAdd = null;
        let submitAction =null;
        if(this.props.list)
        {
            list = this.props.list;
            okButton = <button type="button" onClick= {this.props.cancelEdit}>OK</button>;
            saveOrAdd=(<button type="submit">Add</button>);
            submitAction=this.props.addOption;
        }
        else
        { 
            submitAction=this.props.editAction;
            saveOrAdd=(
            <React.Fragment>
                <button type="submit">Save changes</button>
                <button type="button" onClick= {this.props.cancelEdit}>Cancel</button>
            </React.Fragment>);
        }
        if(this.props.body)
        {
            body=this.props.body;
        }
        let input = <textarea rows="2" name="newValue" defaultValue={this.props.overlayed.extras.value} type="text" className="myInput" 
        placeholder={this.props.overlayed.extras.placeholder +"..."} required/>;
        if(this.props.date)
        {
            input = <input name="newValue" defaultValue={this.props.overlayed.extras.value} type="date" className="myInput" 
            placeholder={this.props.overlayed.extras.placeholder +"..."} required/>;
        }
        return (
            <div className="overlayed">
                <div className="elementEditForm">
                    <form id="optionsAdder" className = "elementEditForm" onSubmit={submitAction} >
                        <span className="putLeft">{this.props.overlayed.extras.placeholder+": "}</span>
                        {input}
                        {saveOrAdd}
                    </form>
                    <ul className="myUL">
                        {list}
                    <br/>
                    </ul>
                    {okButton}
                </div>
                {body}
            </div>

          );
    }
}
 
export default TextOverlayForm;