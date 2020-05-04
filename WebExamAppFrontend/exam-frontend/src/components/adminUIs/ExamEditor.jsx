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
        selectedQuestions: null,
        staticQuestions: this.props.exam.staticQuestions,
        allQuestions: [],
        selectedQuestions: null,
      }
    constructor(props)
    {
        super(props);
        document.title = "Exam Editor";
        this.FetchAvailableSubAreas(props.userId);
        if(!props.new)
        {
            this.FetchSubAreaQuestions(props.exam.subAreaId);
        }
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
    controlExamParameters =(exam) =>
    {
        let accepted = {value: true, message: null}
        if(exam.title == null || exam.fromDate == null 
            || exam.untilDate == null || exam.subAreaId == 0 ||
            exam.subAreaId == null || exam.numberQuestions == 0 )
            accepted = {value: false, message: "You need to fill ALL fields!"};
        if(exam.staticQuestions == false && exam.numberQuestions>this.state.allQuestions.length)
            accepted = {value: false, message: "Invalid number of questions, must be between 1 and "+this.state.allQuestions.length};
        return accepted;
    }
    showActive = (event)=>
    {
        event.preventDefault();
        let numberOfQuestions = this.GetTotalScore(event);
        let realExam = this.RefurbishExam(this.state.exam,numberOfQuestions);
        let accepted = this.controlExamParameters(realExam)
        if( accepted.value== false)
        {
            alert(accepted.message);
            return;
        }
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
                    numberQuestions: numberOfQuestions
                })
            }).catch((e)=>{alert("Error, couldn't add or edit student")});
            alert("Changes Succesfully done");
            window.location.assign("/home");
        console.log(realExam);

    }
    RefurbishExam = (exam,numberOfQuestions)=>
    {
        exam.examElements = exam.RealExamQuestion;
        exam.numberQuestions = numberOfQuestions;
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
        let changedSubArea = exam.subAreaId == parseInt(event.target.value);
        exam.subarea = subarea.name;
        exam.subAreaId = parseInt(event.target.value);
        this.setState({exam:exam});
        if(this.state.allQuestions[0] == null || changedSubArea)
            this.ResetExamQuestions(true);
    }
    ResetExamQuestions = (fetch) => 
    {
        let exam = this.state.exam;
        exam.RealExamQuestion = [];
        this.setState({exam});
        if(fetch)
        {
            this.FetchSubAreaQuestions(this.state.exam.subAreaId);
        }
        else 
        {
            this.setState({selectedQuestions: []});
        }
    }
    GetTotalScore = (event) =>
    {
        let staticQuestions = this.state.exam.staticQuestions;
        if(staticQuestions == false)
        {
            return parseInt(event.target.parentElement.nQuestions.value);
        }
        else
        {
            return this.state.exam.RealExamQuestion.length;
        }
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
        newExam.staticQuestions = event.target.value == "true"?true:false;
        this.setState({exam:newExam});
    }

    render() 
    {  
        let overlay = this.GetOverlayedForm();
        if (overlay!=null)
            return overlay;
        let fromDate = this.FormatDate(this.state.exam.fromDate);
        let untilDate = this.FormatDate(this.state.exam.untilDate);
        let questions = null;
        let numberOfQuestions = null;
        if(this.state.exam.staticQuestions == true || this.state.exam.staticQuestions == true)
            questions = (
                <>
                    <QuestionsViewer questions = {this.state.exam.RealExamQuestion.slice()}  manageQuestions = {this.ManageQuestions}/>
                    <br/>
                    <button onClick={this.showActive}>Upload Exam</button>
                </>
            );
        else numberOfQuestions = (
            <form>
                <label className="Stag" >Questions: </label>
                <input className="NumberInput" defaultValue={this.state.exam.numberQuestions} type="number" id="nQuestions" name="nQuestions" min={1} max={this.state.allQuestions.length} placeholder={"1 to "+this.state.allQuestions.length} required/>
                <br/>
                <button onClick={this.showActive}>Upload Exam</button>
            </form>
        );
        return (
            <React.Fragment>
                <div className="">
                    <h3 className="Title" title= {this.state.exam.title}>Exam Title: {this.state.exam.title} <button  onClick= {this.handleEdit}>Edit</button></h3>
                    <h3 className="FromDate" title={this.state.exam.fromDate}>Date From: {fromDate} <button  onClick= {this.handleEdit}>Edit</button></h3>
                    <h3 className="UntilDate" title={this.state.exam.untilDate}>Date Until: {untilDate} <button  onClick= {this.handleEdit}>Edit</button></h3>
                    <h3 className="SubAreaEdit" title= {this.state.exam.subarea}>Sub-Area Assigned: {this.state.exam.subarea} <button onClick={this.handleEdit}>Edit</button></h3>
                    <h3 className="examType">Exam Type: </h3>
                        <input type="radio" onChange={this.handleChangeType} id="static" name="type" value={true} defaultChecked={this.state.exam.staticQuestions}/>
                        <label className="radioLabel" >Static Questions</label>
                        <input type="radio" onChange={this.handleChangeType} id="random" name="type" value={false} defaultChecked={!this.state.exam.staticQuestions}/>
                        <label className="radioLabel" >Random Questions</label>
                        
                </div>
                {questions}
                {numberOfQuestions}
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
                    return this.GetAllQuestionsOverlayForm();
            }   
        }
        else return null;
    }
    handleCheckAnswer = (event) =>
    {
        let selectedQuestions = this.state.selectedQuestions.slice();
        let allQuestions = this.state.allQuestions.slice();
        let index  = allQuestions.findIndex(question=>question.questionId == event.target.title);
        if(event.target.checked)
        {
            selectedQuestions[index] = event.target.title;
            this.IntroduceNewQuestion(index);
        }
        else 
        {
            selectedQuestions[index] = 0;
            this.DeleteQuestion(index);
        }
        this.setState({selectedQuestions: selectedQuestions});
        
    }
    FetchSubAreaQuestions = (subAreaId) =>
    {
        let context = this;
        fetch('http://localhost:51061/api/SubAreaQuestions/'+subAreaId)
        .then(result=>result.json())
        .then((data)=>{
            let realQuestions = context.RefurbishQuestions(data);
            context.setState({allQuestions:realQuestions});
            let selectedQuestions = Array(realQuestions.length).fill(0);
            selectedQuestions = this.AssignSelectedQuestions(selectedQuestions,realQuestions);
            context.setState({selectedQuestions});
        })
        .catch((e)=>{
            this.setState({allQuestions: []});
            this.setState({selectedQuestions: []});
        });
    }
    AssignSelectedQuestions = (selectedQuestions,allQuestions) =>
    {
        let examQuestions = this.state.exam.RealExamQuestion.slice();
        for(let i=0; i<examQuestions.length; i++)
        {
            let index = allQuestions.findIndex(question=>question.questionId == examQuestions[i].questionId);
                selectedQuestions[index] = examQuestions[i].questionId;
        }
        console.log(selectedQuestions);
        return selectedQuestions;
    }
    RefurbishQuestions = (questions) => 
    {
        console.log(questions);
        let realQuestions = questions;
        for(let i=0; i<questions.length; i++)
        {
            realQuestions[i].optionElement = 
            {
                type: questions[i].type,
                multiple: questions[i].multiple,
                options: questions[i].options,
                answer: questions[i].answer,
                questionId: questions[i].questionId
            }
        }
        return realQuestions;
    
    }
    ManageQuestions = () => 
    {
        this.setState({overlayed: 
        {
            overlay: true,
            extras : {type: "Questions"},
            type: "Questions",
        }})
    }
    GetAllQuestionsOverlayForm = () =>
    {
        if(this.state.allQuestions[0] == null)
        return(<div className="overlayedHome">
        <h1>No questions in this Sub-Area...</h1>;
        <button onClick = {this.cancelEdit}>OK</button>
        </div>)
        console.log(this.state.allQuestions);
        return (
            <div className="overlayed">
                <QuestionsViewer questions={this.state.allQuestions} checked = {this.state.selectedQuestions} 
                handleCheckAnswer = {this.handleCheckAnswer} selectQuestions= {true} />
                <button onClick={this.cancelEdit}>OK</button>
            </div>
        );
    }
    IntroduceNewQuestion = (index) =>
    {
        let newList = this.state.exam.RealExamQuestion.slice();
        let allQuestions = this.state.allQuestions.slice();
        newList.push(allQuestions[index]);
        let exam = this.state.exam;
        exam.RealExamQuestion = newList;
        this.setState({exam:exam});
    }
    DeleteQuestion = (index) =>
    {
        let newList = this.state.exam.RealExamQuestion.slice();
        let allQuestions = this.state.allQuestions.slice();
        newList = newList.filter(question=>question.questionId != allQuestions[index].questionId);
        let exam = this.state.exam;
        exam.RealExamQuestion = newList;
        this.setState({exam:exam});
    }

    
    
}
 
export default ExamEditor;