import React, { Component } from 'react';

class Switch extends Component {
    state = { 
        isSelected: this.props.isSelected,
        activeColor: this.props.activeColor,
     }

    changeSelected = (event) =>
    {
        this.props.handleToggle(!this.state.isSelected);
        this.setState({isSelected:!this.state.isSelected});
    }
    render() { 
        let {isSelected,activeColor} = this.state;
        return (
            <>
                <span>{this.props.label}</span>
                <input
                    className="switchCheckbox"
                    id={this.props.id}
                    onChange={this.changeSelected}
                    type="checkbox"
                />
                <label
                    style={{background: isSelected && activeColor}}
                    className="switchLabel"
                    htmlFor={this.props.id}
                >
                    <span className={"switchButton"}/>
                </label>
            </>
          );
    }
}
 
export default Switch;