import React, { Component } from 'react';

class StudentExamTaker extends Component {
    state = {
        questions : this.props.exam.questions,
        answers: this.props.exam.answers,
        date: this.props.exam.date,
        subarea: this.props.exam.subarea,
        score: this.props.exam.score,
        overlayed : 
        {
            overlay: false,
            extras : null,
            formType: "Text",
        },
      }
    renderList = () => 
    {
        
        let list = [];
        for(let i=0;i<this.state.questions.length;i++)
        {
            let listElement = (
            <div>
                <li className="ExamQuestion" title={this.state.questions[i]} key={"Q"+i}><span className="etag">{(i+1)+". "}</span>{this.state.questions[i]}</li> 
                <li id={i} title={this.state.answers[i]} className="StudentAnswer" key={"SA"+i}>
                <span className="etag">Your Answer: </span> 
                {this.state.answers[i]}
                <button  onClick= {this.handleEdit} className="editAnswerStudent">Edit</button>
                </li> 
            </div> 
            )
            list.push(listElement);
        }
        return list;
    }
    handleEdit = (event) =>
    {
        event.preventDefault();
        let extras = {
            id: event.target.parentElement.id,
            value: event.target.parentElement.title,
            question: event.target.parentElement.previousElementSibling.title,
            placeholder: "Your Answer",
        }
        this.setState({overlayed:
        {
            overlay: true,
            extras:extras,
            formType: "Text",
        }})
    }

    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }

    editAction = (event) =>
    {
        event.preventDefault();
        let extras = this.state.overlayed.extras;
        let newAnswers = this.state.answers.slice();
        newAnswers[extras.id] = event.target.newValue.value;
        this.setState({answers:newAnswers})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
    }

    GetTextOverlayForm = () =>
    {
        return (
            <div className="overlayed">
            <form className = "elementEditFormBorder" onSubmit={this.editAction} >
                <h3>{this.state.overlayed.extras.question+": "}</h3>
                <textarea  rows="2" name="newValue" defaultValue={this.state.overlayed.extras.value} type="text" className="myInput" placeholder={this.state.overlayed.extras.placeholder +"..."} required/>
                <button id="submitAnswer" type="submit">Save changes</button>
                <button type="button" onClick= {this.cancelEdit}>Cancel</button>
            </form>
            </div>
        );
    }

    GetOverlayForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            if(this.state.overlayed.formType == "select")
                console.log("Comming Soon");
                //return this.GetAreasOverlayForm();
            else
                return this.GetTextOverlayForm();
        }
        else return null;
    }

    render() {  
        let overlay = this.GetOverlayForm();
        return (
            <React.Fragment>
                <h3 title={this.state.date}>Date: {this.state.date}</h3>
                <h3 className="SubAreaEdit" title= {this.state.subarea}>Sub-Area Assigned: {this.state.subarea} </h3>
                <ul className="myUL">
                    {this.renderList()}
                    <br/>
                </ul>
                <button onClick={this.submitExam}>Submit Exam</button>
                {overlay}

            </React.Fragment>
          );
    }



}
 
export default StudentExamTaker;