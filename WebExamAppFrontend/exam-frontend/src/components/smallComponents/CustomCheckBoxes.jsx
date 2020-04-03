import React, { Component } from 'react';

class CustomCheckBoxes extends Component {
    state = {  }

    renderCheckBoxes = (answers, generalArray, extras) =>
    {
       
        let checkboxes = [];
        for(let i=0; i<generalArray.length; i++)
        {
            let isChecked = answers.find((answer)=>answer==generalArray[i])!=null;
            checkboxes.push(
            <label key={i+"Chk"} className="checkContainer">
                <input type="checkbox" defaultChecked={isChecked}
                value ={generalArray[i]} onChange={this.props.handleCheckAnswer} />
                <div className="TagContainer" key={"Div"+i}>
                    <span className="CheckBoxTag">{generalArray[i]}{extras}</span>
                </div>
                <span className="checkmark"></span>
                <br/>
            </label>)
        }
        return checkboxes;
    }

    render() { 
        let extras = null;
        if(this.props.extras)
            extras = this.props.extras;
        let checkBoxes = this.renderCheckBoxes(this.props.answers, this.props.generalArray,extras);
        return (
            <React.Fragment>
                {checkBoxes}
            </React.Fragment>
          );
    }
}
 
export default CustomCheckBoxes;