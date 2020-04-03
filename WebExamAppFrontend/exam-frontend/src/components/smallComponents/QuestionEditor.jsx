import React, { Component } from 'react';

class QuestionEditor extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <h3 className="Date" title={this.props.date}>Exam Date: {this.props.date} <button  onClick= {this.props.handleEdit}>Edit</button></h3>
                <h3 className="SubAreaEdit" title= {this.props.subarea}>Sub-Area Assigned: {this.props.subarea} <button onClick={this.props.handleEdit}>Edit</button></h3>
                <form id="admExmForm" onSubmit={this.props.newElement} className="Examheader">
                    <div id="inputsDiv" >
                        <span className="qtag"> Question:</span>
                        <textarea rows="2" name="question" type="text" className="myInput" placeholder="Title..." required/>
                        <div id="breakAnswer"/>
                        <span className="qtag"> Options:</span><button onClick={this.props.handleManageOptions} type="button" className="AddAnswerBtn">Manage Options</button>
                        <span className="Atag">Answer:</span><button onClick={this.props.handleManageAnswer} type="button" className="AddAnswerBtn">Manage Answer</button>
                        <br/>
                        <span className="qtag"> Type:</span>
                        <div className="RadioContainer">
                            <input type="radio" onChange={this.props.handleChangeType} id="single" name="type" value="single" defaultChecked={true}/>
                            <label className="radioLabel" >Single</label>
                            <input type="radio" onChange={this.props.handleChangeType} id="multiple" name="type" value="multiple" defaultChecked={false}/>
                            <label className="radioLabel" >Multiple</label>
                            <label className="Stag">Score: </label>
                            <input className="NumberInput" type="number" id="score" name="score" min="1" max="100" placeholder="1 to 100" required/>
                        </div>
                        <button type="submit" className="addBtn">Add Question</button>
                    </div>
                </form>
                <ul className="myUL">
                    {this.props.renderedList}
                    <br/>
                    <button onClick={this.props.showActive}>Upload Exam</button>
                </ul>
                {this.props.overlay}
            </React.Fragment>
          );
    }
}
 
export default QuestionEditor;