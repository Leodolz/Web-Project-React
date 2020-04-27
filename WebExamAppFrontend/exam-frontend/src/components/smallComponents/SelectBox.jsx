import React, { Component } from 'react';

class SelectBox extends Component {

    render() { 
        return (
            <div className="overlayedHome">
            <form className = "elementEditForm" >
                <span className="etag">{this.props.overlayed.extras.placeholder+": "}</span>
                <br/>
                <select name="newValue" onClick ={this.props.handleSelectOption}  defaultValue={this.props.element} onChange={this.props.handleSelectOption} className="SelectOption">
                    {this.props.optionsBox}
                </select>
                <br/>
                <button type="button" onClick= {this.props.cancelEdit}>OK</button>
            </form>
            </div>
          );
    }
}
 
export default SelectBox;