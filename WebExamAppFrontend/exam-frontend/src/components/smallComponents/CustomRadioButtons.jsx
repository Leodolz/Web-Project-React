import React, { Component } from 'react';

class CustomRadioButtons extends Component {
    state = {  }
    renderRadioButtons = (answer, generalArray, extras) =>
    {
        let radioButtons = [];
        for(let i=0; i<generalArray.length; i++)
        {
            let isChecked = (answer == generalArray[i]);
            let radioButton = (<React.Fragment>
                <input key={i+"Rd"} type="radio" onChange={this.props.handleChangeRadioAnswer} id={i+"Rd"} name="answer" value={generalArray[i]} defaultChecked={isChecked}/>
                <label className="radioLabel">{generalArray[i]}{extras}</label>
                <br/>
            </React.Fragment>);
            radioButtons.push(radioButton);
        }
        return radioButtons;
    }
    render() { 
        let extras = null;
        if(this.props.extras)
            extras = this.props.extras;
        let radioButtons = this.renderRadioButtons(this.props.answer, this.props.generalArray,extras);
        return ( 
            <React.Fragment>
                {radioButtons}
            </React.Fragment>
         );
    }
}
 
export default CustomRadioButtons;