import React, { Component } from 'react';
import TextOverlayForm from '../smallComponents/TextOverlayForm';
import SelectBox from '../smallComponents/SelectBox';
import QuestionEditor from '../smallComponents/QuestionEditor';


class ExamEditor extends Component {
    state = {
        exam: this.props.exam,
        overlayed : {
            overlay: false,
            extras : null,
            type: "Date",
        },
        editingId: 0,
      }
    showActive = (event)=>
    {
        let realExam = this.RefurbishExam(this.state.exam);
        let edit = 'true';
            if(this.props.new)
                edit='false';
            fetch('http://localhost:51061/api/EditExam?edit='+edit,
            {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: realExam.Id,
                    title: realExam.title,
                    fromDate: realExam.fromDate,
                    subAreaId: realExam.subAreaId,
                    subarea: realExam.subarea,
                    untilDate: realExam.untilDate,
                    RealExamQuestion: realExam.RealExamQuestion,
                })
            }).catch((e)=>{alert("Error, couldn't add or edit student")});
            alert("Student succesfully Edited");
            window.location.assign("/home");
        console.log(this.RefurbishExam(this.state.exam));
    }
    RefurbishExam = (exam)=>
    {
        for(let i=0; i<exam.RealExamQuestion.length; i++)
        {
            exam.RealExamQuestion[i].type = exam.RealExamQuestion[i].optionElement.multiple?"Multiple":"Single";
            exam.RealExamQuestion[i].multiple = exam.RealExamQuestion[i].optionElement.multiple;
            exam.RealExamQuestion[i].options = exam.RealExamQuestion[i].optionElement.options;
            exam.RealExamQuestion[i].answer = exam.RealExamQuestion[i].optionElement.answer;
            delete exam.RealExamQuestion[i].optionElement;
        }
        return exam;
    }
    DeleteComponentInArray = (event,array)=>
    {
        let elementId = event.target.parentElement.id;
        let newarray = array.slice();
        return newarray.filter((value,index)=>{ return index!=elementId});
    }
    hideComponent = (event)=>
    {
        let newArray = this.DeleteComponentInArray(event,this.state.exam.RealExamQuestion)
        let exam = this.state.exam;
        exam.RealExamQuestion = newArray;
        this.setState({exam:exam});
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
        let element = this.state.exam.RealExamQuestion[event.target.parentElement.id];
        let preDefValue = 
        {
            optionElement: element.optionElement,
            title: element.title,
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
        let newList = this.state.exam.RealExamQuestion.slice();
        newList[this.state.editingId] = newQuestion;
        let exam = this.state.exam;
        exam.RealExamQuestion = newList;
        this.setState({exam:exam});
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
        for(let i=0;i<this.state.exam.RealExamQuestion.length;i++)
        {
            let answerTag = null;
            if(this.state.exam.RealExamQuestion[i].optionElement.type == "Multiple")
                answerTag="Answers: ";
            else answerTag="Answer: ";
            let options = this.state.exam.RealExamQuestion[i].optionElement.options.join(", "); 
            let answers = this.state.exam.RealExamQuestion[i].optionElement.answer.join(", ");
            let listElement = (
            <React.Fragment key={"QA"+i}>
                <li className="ExamQuestion" title={this.state.exam.RealExamQuestion[i].title} id={i} key={"Q"+i}><span className="etag">{(i+1)+". "}</span>{this.state.exam.RealExamQuestion[i].title}{closeButton}{editButton}</li> 
                <li className="ExamAnswer" title = {options} key={"O"+i}><span className="etag">Options: </span>{options}</li>
            <li className="ExamAnswer" title = {answers} key={"A"+i}><span className="etag">{answerTag}</span>{answers} <span className="etag">Score: </span>{this.state.exam.RealExamQuestion[i].score}</li>
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
        let exam = this.state.exam;
        exam.subarea = event.target.value
        this.setState({exam:exam});
    }

    GetSubAreasOverlayForm = () =>
    {
        let areasBox = this.PopulateSubAreaOptions();
        return <SelectBox overlayed={this.state.overlayed} element={this.state.exam.subarea} 
        cancelEdit={this.cancelEdit} handleSelectOption = {this.handleSelectSubArea} optionsBox = {areasBox}/>
    }
    getCloseButton()
    {
        return <button onClick={this.hideComponent} className="close">x</button>; 
    }
    getNewQuestion = (newQuestion) =>
    {
        let newList = this.state.exam.RealExamQuestion.slice();
        newList.push(newQuestion);
        let exam = this.state.exam;
        exam.RealExamQuestion = newList;
        this.setState({exam:exam});
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

    FormatDate = (date) =>
    {
        let formatedDate = new Date(date);
        formatedDate = formatedDate.toLocaleDateString() + " "
            + formatedDate.toLocaleTimeString();
        return formatedDate;
    }

    render() 
    {  
        let overlay = this.GetOverlayedForm();
        let fromDate = this.FormatDate(this.state.exam.fromDate);
        let untilDate = this.FormatDate(this.state.exam.untilDate);
        return (
            <React.Fragment>
                <h3 className="Title" title= {this.state.exam.title}>Exam Title: {this.state.exam.title} <button  onClick= {this.handleEdit}>Edit</button></h3>
                <h3 className="FromDate" title={this.state.exam.fromDate}>Date From: {fromDate} <button  onClick= {this.handleEdit}>Edit</button></h3>
                <h3 className="UntilDate" title={this.state.exam.untilDate}>Date Until: {untilDate} <button  onClick= {this.handleEdit}>Edit</button></h3>
                <h3 className="SubAreaEdit" title= {this.state.exam.subarea}>Sub-Area Assigned: {this.state.exam.subarea} <button onClick={this.handleEdit}>Edit</button></h3>
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
        let exam = this.state.exam;
        event.preventDefault();
        if(this.state.overlayed.extras.placeholder == "Title")
            exam.title = event.target.newValue.value;
        else if(this.state.overlayed.extras.placeholder == "FromDate")
            exam.fromDate = event.target.newValue.value;
        else if(this.state.overlayed.extras.placeholder == "UntilDate")
            exam.untilDate = event.target.newValue.value;
        this.setState({exam:exam})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
    }


    
    
}
 
export default ExamEditor;