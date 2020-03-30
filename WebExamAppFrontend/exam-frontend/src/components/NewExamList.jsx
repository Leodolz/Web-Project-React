import React, { Component } from 'react';

class NewExamList extends Component {
    state = {
        listElements : [
        ],
        overlayed : {
            overlay: false,
            extras : null
        },
        date: null
      }
    constructor(props)
    {
        super(props);
        if(this.props.exam)
        {
            this.setState({listElements:this.props.exam.elements});
            this.setState({date: this.props.exam.date});
        }
    }
    hideComponent = (event)=>
    {
        let elementId = event.target.parentElement.id;
        let newarray = this.state.listElements.slice();
        newarray = newarray.filter((value,index)=>{ return index!=elementId});
        this.setState({listElements:newarray});
    }
    renderList = () => 
    {
        
        let list = [];
        let closeButton = <button type="button" onClick={this.hideComponent} className="close">x</button>;
        let editButton = <button  onClick= {this.handleEdit} className="edit">Edit</button>;
        for(let i=0;i<this.state.listElements.length;i++)
        {
            let listElement = (
            <React.Fragment key={"QA"+i}>
                <li className="ExamQuestion" title={this.state.listElements[i].title} id={i} key={"Q"+i}><span className="etag">{(i+1)+". "}</span>{this.state.listElements[i].title}{closeButton}{editButton}</li> 
                <li className="ExamAnswer" title = {this.state.listElements[i].answer} key={"A"+i}><span className="etag">Answer: </span>{this.state.listElements[i].answer}{editButton}</li>
            </React.Fragment> 
            )
            list.push(listElement);
        }
        return list;
    }
    showActive = (event)=>
    {
        console.log(this.state.listElements);
    }
    cancelEdit = (event) =>
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    render() {  
        let overlay = null;
        if(this.state.overlayed.overlay)
            overlay = (
                <div className="overlayed">
                <form className = "elementEditForm" onSubmit={this.editAction} >
                    <span className="putLeft">{this.state.overlayed.extras.placeholder+": "}</span>
                    <textarea rows="2" name="newValue" defaultValue={this.state.overlayed.extras.value} type="text" className="myInput" placeholder={this.state.overlayed.extras.placeholder +"..."} required/>
                    <button type="submit">Save changes</button>
                    <button type="button" onClick= {this.cancelEdit}>Cancel</button>
                </form>
                </div>
            );
        return (
            <React.Fragment>
                <h2 title={this.state.date}>Exam Date: {this.state.date} <button  onClick= {this.handleEdit}>Edit</button></h2>
                <form id="admExmForm" onSubmit={this.newElement} className="Examheader">
                    <div id="inputsDiv" >
                    <textarea rows="2" name="question" type="text" className="myInput" placeholder="Title..." required/>
                    <div id="breakAnswer"/>
                    <textarea  rows="2" name="answer" type="text" className="myInput" placeholder="Answer..." required/>
                    </div>
                    <button type="submit" className="addBtn">Add</button>
                </form>
                <ul className="myUL">
                    {this.renderList()}
                    <br/>
                    <button onClick={this.showActive}>Upload Exam</button>
                </ul>
                {overlay}
            </React.Fragment>
          );
    }
    getCloseButton()
    {
        return <button onClick={this.hideComponent} className="close">x</button>;
    }
    newElement = (event) =>
    {
        event.preventDefault();
        let newQuestion = event.target.question.value;
        let newAnswer = event.target.answer.value;
        let newList = this.state.listElements.slice();
        newList.push({title:newQuestion,answer:newAnswer});
        document.getElementById("admExmForm").reset();
        this.setState({listElements:newList});
    }
    handleEdit = (event) =>
    {
        event.preventDefault();
        let element = event.target.parentElement;
        console.log("This is an edit with "+element.title)
        let extras = {};

        if(element.className == "ExamQuestion")
        {  
            extras = {
                placeholder: "Question",
                id: element.id,
                value: element.title,
                question: true
            };
        }
        else if (element.className == "ExamAnswer")
        { 
            extras = {
                placeholder: "Answer",
                id: element.previousElementSibling.id,
                value:  element.title,
                question: false
            }
        }
        else extras = {
            placeholder: "Date",
            value: element.title
        }
        this.setState({overlayed: {
            overlay: true,
            extras:extras
        }});
        
    }
    editAction = (event) =>
    {
        event.preventDefault();
        let extras = this.state.overlayed.extras;
        if(extras.id)
        {
            let newArray = this.state.listElements.slice();
            if(extras.question)
                newArray[extras.id].title = event.target.newValue.value;
            else newArray[extras.id].answer = event.target.newValue.value;
            this.setState({listElements:newArray});
        }
        else this.setState({date:event.target.newValue.value})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
    }
}
 
export default NewExamList;