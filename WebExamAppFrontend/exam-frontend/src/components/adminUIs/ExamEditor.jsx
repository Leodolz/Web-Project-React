import React, { Component } from 'react';
import TextOverlayForm from '../smallComponents/TextOverlayForm';
import SelectBox from '../smallComponents/SelectBox';
import QuestionEditor from '../smallComponents/QuestionEditor';


class NewExamList extends Component {
    state = {
        listElements : [
        ],
        overlayed : {
            overlay: false,
            extras : null,
            type: "Date",
        },
        editingId: 0,
        dateFrom: null,
        dateUntil: null,
        subarea: null,
        title: null,
      }
    showActive = (event)=>
    {
        console.log(this.state.listElements);
    }
    DeleteComponentInArray = (event,array)=>
    {
        let elementId = event.target.parentElement.id;
        let newarray = array.slice();
        return newarray.filter((value,index)=>{ return index!=elementId});
    }
    hideComponent = (event)=>
    {
        let newArray = this.DeleteComponentInArray(event,this.state.listElements)
        this.setState({listElements:newArray});
    }
    findItemsInArray = (currentArray,generalArray) =>
    {
        for(let i=0;i<currentArray.length;i++)
        {
            if(generalArray.find(item=>item==currentArray[i])!=null)
            {
                return true;
            }
        }
        return false;
    }

    editQuestion = (event) =>
    {
        event.preventDefault();
        let element = this.state.listElements[event.target.parentElement.id];
        let preDefValue = 
        {
            optionElement: element.optionElement,
            question: element.question,
            score: element.score
        };
        let extras = {
            placeholder: "Question Editor",
            value: preDefValue,
            type: "Question"
        }
        this.setState({editingId:event.target.parentElement.id});
        this.setState({overlayed: {
            overlay: true,
            extras:extras
        }});
    }

    getEditedQuestion = (newQuestion) =>
    {
        let newList = this.state.listElements.slice();
        newList[this.state.editingId] = newQuestion;
        this.setState({listElements:newList});
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }});
    }

    renderList = () => 
    {
        let list = [];
        let closeButton = <button type="button" onClick={this.hideComponent} className="close">x</button>;
        let editButton = <button  onClick= {this.editQuestion} className="edit">Edit</button>;
        for(let i=0;i<this.state.listElements.length;i++)
        {
            let answerTag = null;
            if(this.state.listElements[i].optionElement.type == "Multiple")
                answerTag="Answers: ";
            else answerTag="Answer: ";
            let options = this.state.listElements[i].optionElement.options.join(", "); 
            let answers = this.state.listElements[i].optionElement.answer.join(", ");
            let listElement = (
            <React.Fragment key={"QA"+i}>
                <li className="ExamQuestion" title={this.state.listElements[i].question} id={i} key={"Q"+i}><span className="etag">{(i+1)+". "}</span>{this.state.listElements[i].question}{closeButton}{editButton}</li> 
                <li className="ExamAnswer" title = {options} key={"O"+i}><span className="etag">Options: </span>{options}</li>
            <li className="ExamAnswer" title = {answers} key={"A"+i}><span className="etag">{answerTag}</span>{answers} <span className="etag">Score: </span>{this.state.listElements[i].score}</li>
            </React.Fragment> 
            )
            list.push(listElement);
        }
        return list;
    }
    PopulateSubAreaOptions = () =>
    {
        let areasBody = [];
        //I will change this When backend is done
        areasBody.push(<option key="1" value="Calculus I">Calculus I</option>);
        areasBody.push(<option key="2" value="Geometry">Geometry</option>);
        areasBody.push(<option key="3" value="World History">World History</option>);
        return areasBody;
    }
    handleSelectSubArea = (event) =>
    {
        event.preventDefault();
        this.setState({subarea:event.target.value});
    }

    GetSubAreasOverlayForm = () =>
    {
        let areasBox = this.PopulateSubAreaOptions();
        return <SelectBox overlayed={this.state.overlayed} element={this.state.subarea} 
        cancelEdit={this.cancelEdit} handleSelectOption = {this.handleSelectSubArea} optionsBox = {areasBox}/>
    }
    getCloseButton()
    {
        return <button onClick={this.hideComponent} className="close">x</button>; 
    }
    getNewQuestion = (newQuestion) =>
    {
        let newList = this.state.listElements.slice();
        newList.push(newQuestion);
        this.setState({listElements:newList});
    }
    GetDateOverlayForm = () =>
    {
        return <TextOverlayForm editAction={this.editAction} overlayed = {this.state.overlayed} cancelEdit={this.cancelEdit} datetime={true}/>;
    }
    GetTitleOverlayForm = () =>
    {
        return <TextOverlayForm editAction={this.editAction} overlayed = {this.state.overlayed} cancelEdit={this.cancelEdit}/>;
    }
    GetQuestionOverlayForm = () =>
    {
        let extras = this.state.overlayed.extras;
        return (
            <div className="overlayed">
                <QuestionEditor getNewQuestion={this.getNewQuestion}  findItemsInArray={this.findItemsInArray} DeleteComponentInArray={this.DeleteComponentInArray}
                preDefQuestion={extras.value} editing={true} getEditedQuestion={this.getEditedQuestion}/>
            </div>
            );
    }
    cancelEdit = (event) => 
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    GetOverlayedForm = () => 
    {
        if(this.state.overlayed.overlay)
        {
            switch(this.state.overlayed.extras.type)
            {
                case "Sub-Area":
                    return this.GetSubAreasOverlayForm();
                case "Date":
                    return this.GetDateOverlayForm();
                case "Title":
                    return this.GetTitleOverlayForm();
                default:
                    return this.GetQuestionOverlayForm();
            }   
        }
        else return null;
    }

    render() 
    {  
        let overlay = this.GetOverlayedForm();
        return (
            <React.Fragment>
                <h3 className="Title" title= {this.state.title}>Exam Title: {this.state.title} <button  onClick= {this.handleEdit}>Edit</button></h3>
                <h3 className="FromDate" title={this.state.dateFrom}>Date From: {this.state.dateFrom} <button  onClick= {this.handleEdit}>Edit</button></h3>
                <h3 className="UntilDate" title={this.state.dateUntil}>Date Until: {this.state.dateUntil} <button  onClick= {this.handleEdit}>Edit</button></h3>
                <h3 className="SubAreaEdit" title= {this.state.subarea}>Sub-Area Assigned: {this.state.subarea} <button onClick={this.handleEdit}>Edit</button></h3>
                <QuestionEditor getNewQuestion={this.getNewQuestion}  findItemsInArray={this.findItemsInArray} DeleteComponentInArray={this.DeleteComponentInArray}/>
                <ul className="myUL">
                    {this.renderList()}
                    <br/>
                    <button onClick={this.showActive}>Upload Exam</button>
                </ul>
                {overlay}
            </React.Fragment>
          );
    }
   

    handleEdit = (event) =>
    {
        event.preventDefault();
        let element = event.target.parentElement;
        let extras = {};
        if(element.className == "SubAreaEdit")
        {
            extras = 
            {
                placeholder: "Sub-Area",
                value: element.title,
                type: "Sub-Area",
            }
        }
        else if (element.className == "FromDate")
        {
            extras  =
            {
                placeholder: "FromDate",
                value: element.title,
                type: "Date",
            }
        }
        else if (element.className == "UntilDate")
        {
            extras  =
            {
                placeholder: "UntilDate",
                value: element.title,
                type: "Date",
            }
        }
        else if (element.className == "Title")
        {
            extras  =
            {
                placeholder: "Title",
                value: element.title,
                type: "Title",
            }
        }
        this.setState({overlayed: {
            overlay: true,
            extras:extras
        }});
        
    }
    editAction = (event) =>
    {
        event.preventDefault();
        if(this.state.overlayed.extras.placeholder == "Title")
            this.setState({title:event.target.newValue.value})
        else if(this.state.overlayed.extras.placeholder == "FromDate")
            this.setState({dateFrom:event.target.newValue.value})
        else if(this.state.overlayed.extras.placeholder == "UntilDate")
            this.setState({dateUntil:event.target.newValue.value})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
    }
    
    
}
 
export default NewExamList;