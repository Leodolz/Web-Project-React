import React, { Component } from 'react';
import TextOverlayForm from '../smallComponents/TextOverlayForm';
import SelectBox from '../smallComponents/SelectBox';
import QuestionEditor from '../smallComponents/QuestionEditor';
import QuestionsViewer from '../smallComponents/QuestionsViewer';


class ExamEditor extends Component {
    state = {
        exam: this.props.exam,
        overlayed : {
            overlay: false,
            extras : null,
            type: "Date",
        },
        userId: this.props.userId,
        availableSubAreas: null,
        editingId: 0,
      }
    constructor(props)
    {
        super(props);
        document.title = "Exam Editor";
        this.FetchAvailableSubAreas(props.userId);
    }
    FetchAvailableSubAreas = (userId) =>
    {
        fetch('http://localhost:51061/api/SubAreas/'+userId+
        '?action=GetSubAreas')
        .then(result=>result.json())
        .then((data)=>{
            this.setState({availableSubAreas: data});
        })
        .catch((e)=>{
            console.log(e)});
    }
    showActive = (event)=>
    {
        let totalScore = this.GetTotalScore();
        if(totalScore<100 || totalScore>100)
        {
            alert("Exam must have a total sum of scoring 100 points!");
            return;
        }
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
                    untilDate: realExam.untilDate,
                    examElements: realExam.examElements,
                    staticQuestions: realExam.staticQuestions,
                })
            }).catch((e)=>{alert("Error, couldn't add or edit student")});
            alert("Changes Succesfully done");
            window.location.assign("/home");
        console.log(this.RefurbishExam(realExam));
    }
    RefurbishExam = (exam)=>
    {
        exam.examElements = exam.RealExamQuestion;
        for(let i=0; i<exam.RealExamQuestion.length; i++)
        {
            exam.examElements[i].type = exam.RealExamQuestion[i].optionElement.multiple?"Multiple":"Single";
            exam.examElements[i].multiple = exam.RealExamQuestion[i].optionElement.multiple;
            exam.examElements[i].options = exam.RealExamQuestion[i].optionElement.options;
            exam.examElements[i].answer = exam.RealExamQuestion[i].optionElement.answer;
            let questionId = exam.examElements[i].optionElement.questionId;
            if(questionId == undefined)
                questionId = 0;
            exam.examElements[i].questionId = questionId;
            
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
    PopulateSubAreaOptions = () =>
    {
        let areasBody = [];
        let availableSubAreas = this.state.availableSubAreas;
        for(let i=0; i<availableSubAreas.length;i++)
        {
            areasBody.push(<option key={"SA"+(i+1)} title={availableSubAreas[i].name} value={availableSubAreas[i].Id}>{availableSubAreas[i].name}</option>);
        }
       
        return areasBody;
    }
    handleSelectSubArea = (event) =>
    {
        event.preventDefault();
        let exam = this.state.exam;
        let availableSubAreas = this.state.availableSubAreas;
        let subarea = availableSubAreas.find(item=>item.Id == event.target.value);
        exam.subarea = subarea.name;
        exam.subAreaId = parseInt(event.target.value);
        this.setState({exam:exam});
    }
    GetTotalScore = () =>
    {
        let totalScore = 0;
        let elements = this.state.exam.RealExamQuestion;
        for(let i=0;i<elements.length;i++)
        {
            totalScore = totalScore+elements[i].score;
        }
        return totalScore;
    }
    GetSubAreasOverlayForm = () =>
    {
        let areasBox = this.PopulateSubAreaOptions();
        return <SelectBox overlayed={this.state.overlayed} element={this.state.exam.subAreaId} 
        cancelEdit={this.cancelEdit} handleSelectOption = {this.handleSelectSubArea} optionsBox = {areasBox}/>
    }
    getCloseButton()
    {
        return <button onClick={this.hideComponent} className="close">x</button>; 
    }
   
    GetDateOverlayForm = () =>
    {
        return <TextOverlayForm editAction={this.editAction} overlayed = {this.state.overlayed} cancelEdit={this.cancelEdit} datetime={true}/>;
    }
    GetTitleOverlayForm = () =>
    {
        return <TextOverlayForm editAction={this.editAction} overlayed = {this.state.overlayed} cancelEdit={this.cancelEdit}/>;
    }
    cancelEdit = (event) => 
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }

    FormatDate = (date) =>
    {
        if(date=="")
            return null;
        let formatedDate = new Date(date);
        formatedDate = formatedDate.toLocaleDateString() + " "
            + formatedDate.toLocaleTimeString();
        return formatedDate;
    }

    handleChangeType = (event) =>
    {
        let newExam = this.state.exam;
        newExam.staticQuestions = event.target.value;
        this.setState({exam:newExam});
    }

    render() 
    {  
        console.log(this.state.exam.staticQuestions);
        let overlay = this.GetOverlayedForm();
        let fromDate = this.FormatDate(this.state.exam.fromDate);
        let untilDate = this.FormatDate(this.state.exam.untilDate);
        return (
            <React.Fragment>
                <div className="">
                    <h3 className="Title" title= {this.state.exam.title}>Exam Title: {this.state.exam.title} <button  onClick= {this.handleEdit}>Edit</button></h3>
                    <h3 className="FromDate" title={this.state.exam.fromDate}>Date From: {fromDate} <button  onClick= {this.handleEdit}>Edit</button></h3>
                    <h3 className="UntilDate" title={this.state.exam.untilDate}>Date Until: {untilDate} <button  onClick= {this.handleEdit}>Edit</button></h3>
                    <h3 className="SubAreaEdit" title= {this.state.exam.subarea}>Sub-Area Assigned: {this.state.exam.subarea} <button onClick={this.handleEdit}>Edit</button></h3>
                    <h3 className="examType" title= {this.state.exam.staticQuestions}>Exam Type: </h3>

                        <input type="radio" onChange={this.handleChangeType} id="static" name="type" value={true} defaultChecked={this.state.exam.staticQuestions}/>
                        <label className="radioLabel" >Static Questions</label>
                        <input type="radio" onChange={this.handleChangeType} id="random" name="type" value={false} defaultChecked={!this.state.exam.staticQuestions}/>
                        <label className="radioLabel" >Random Questions</label>

                </div>
                <QuestionEditor getNewQuestion={this.getNewQuestion}  findItemsInArray={this.findItemsInArray} DeleteComponentInArray={this.DeleteComponentInArray}/>
                <QuestionsViewer questions = {this.state.exam.RealExamQuestion.slice()}/>
                <br/>
                <button onClick={this.showActive}>Upload Exam</button>
                {overlay}
            </React.Fragment>
          );
    }


    handleEdit = (event) =>
    {
        event.preventDefault();
        let element = event.target.parentElement;
        let extras = {};
        extras.value = element.title;
        switch(element.className)
        {
            case "SubAreaEdit":
                extras.placeholder= "Sub-Area";
                extras.type= "Sub-Area";
                break;
            case "FromDate":
                extras.placeholder= "FromDate";
                extras.type= "Date";
                break;
            case "UntilDate":
                extras.placeholder= "UntilDate";
                extras.type= "Date";
                break;
            case "Title":
                extras.placeholder= "Title";
                extras.type= "Title";
                break;
            default:
                break;
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
        switch(this.state.overlayed.extras.placeholder)
        {
            case "Title":
                exam.title = event.target.newValue.value;
                break;
            case "FromDate":
                exam.fromDate = event.target.newValue.value;
                break;
            case "UntilDate":
                exam.untilDate = event.target.newValue.value;
                break;
            default: 
                break;
        }
        this.setState({exam:exam})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
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
    GetQuestionOverlayForm = () =>
    {
        let extras = this.state.overlayed.extras;
        return (
            <div className="overlayedHome">
                <QuestionEditor getNewQuestion={this.getNewQuestion}  findItemsInArray={this.findItemsInArray} DeleteComponentInArray={this.DeleteComponentInArray}
                preDefQuestion={extras.value} editing={true} getEditedQuestion={this.getEditedQuestion}/>
            </div>
            );
    }
    getNewQuestion = (newQuestion) =>
    {
        let newList = this.state.exam.RealExamQuestion.slice();
        newList.push(newQuestion);
        let exam = this.state.exam;
        exam.RealExamQuestion = newList;
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
            score: element.score,
            questionId: element.questionId
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

    
    
}
 
export default ExamEditor;