import React, { Component } from 'react';

class NewExamList extends Component {
    state = {
        listElements : [
        ],
        overlayed : {
            overlay: false,
            extras : null,
            type: "Date",
        },
        nestedOverlayed : {
            overlay: false,
            extras : null
        },
        date: null,
        subarea: null,
        tempOptions: {
            options: [],
            answer: [],
            mutiple: false,
        }
      }
    hideComponent = (event)=>
    {
        let elementId = event.target.parentElement.id;
        let newarray = this.state.listElements.slice();
        newarray = newarray.filter((value,index)=>{ return index!=elementId});
        this.setState({listElements:newarray});
    }
    findItemsInArray = (currentArray,generalArray) =>
    {
        let found = false;
        for(let i=0;i<currentArray.length;i++)
        {
            if(generalArray.find(item=>item==currentArray[i])!=null)
            {
                found = true;
                break;
            }
        }
        return found;
    }

    deleteOption = (event) =>
    {
        let elementId = event.target.parentElement.id;
        let newarray = this.state.tempOptions.options.slice();
        let answer = this.state.tempOptions.answer;
        newarray = newarray.filter((value,index)=>{ return index!=elementId});
        this.setState({tempOptions:
            {   
                options: newarray,
                answer: answer,
                mutiple: this.state.tempOptions.mutiple,
            }
        });
    }
    renderList = () => 
    {
        
        let list = [];
        let closeButton = <button type="button" onClick={this.hideComponent} className="close">x</button>;
        let editButton = <button  onClick= {this.handleEdit} className="edit">Edit</button>;
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
    renderOptionsList = () => 
    {
        
        let list = [];
        let optionsList = this.state.tempOptions.options;
        let closeButton = <button type="button" onClick={this.deleteOption} className="close">x</button>;
        let editButton = <button  onClick= {this.handleEdit} className="edit">Edit</button>;
        for(let i=0;i<optionsList.length;i++)
        {
            let listElement = (
            <React.Fragment key={"Option"+i}>
                <li className="Option" title={optionsList[i]} id={i} key={"O"+i}><span className="etag">{(i+1)+". "}</span>{optionsList[i]}{closeButton}{editButton}</li> 
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
    cancelNestedEdit = (event) =>
    {
        this.setState({nestedOverlayed: {
            overlay: false,
            extras:null
        }})
    }
    GetOverlayedForm = () =>
    {
        if(this.state.overlayed.overlay)
        {
            if(this.state.overlayed.extras.type == "Sub-Area")
                return this.GetSubAreasOverlayForm();
            else if(this.state.overlayed.extras.type == "Date")
                return this.GetDateOverlayForm();
            else if(this.state.overlayed.extras.type == "Options")
                return this.GetOptionsOverlayedForm();
            else
                return this.GetAnswerOverlayForm();
        }
        else return null;
    }
    GetDateOverlayForm = () =>
    {
        return (
            <div className="overlayed">
            <form className = "elementEditForm" onSubmit={this.editAction} >
                <span className="putLeft">{this.state.overlayed.extras.placeholder+": "}</span>
                <textarea rows="2" name="newValue" defaultValue={this.state.overlayed.extras.value} type="text" className="myInput" placeholder={this.state.overlayed.extras.placeholder +"..."} required/>
                <button type="submit">Save changes</button>
                <button type="button" onClick= {this.cancelEdit}>Cancel</button>
            </form>
            </div>
        );
    }
    addOption = (event) =>
    {
        event.preventDefault();
        let newOptions  = this.state.tempOptions.options.slice();
        newOptions.push(event.target.newValue.value);
        let answer = this.state.tempOptions.answer;
        this.setState({tempOptions:{
            options: newOptions,
            answer: answer,
            mutiple: this.state.tempOptions.mutiple,
        }});
    }
    handleCheckAnswer = (event) =>
    {
        let newAnswers = this.state.tempOptions.answer;
        if(event.target.checked)
        {
            let answer = event.target.value;
            newAnswers.push(answer);
        }
        else
        {
            newAnswers = newAnswers.filter((value,index,arr)=>value!=event.target.value);
        }
        let newTempOptions = this.state.tempOptions;
        newTempOptions["answer"] = newAnswers;
        this.setState({tempOptions:newTempOptions});
    }
    //MODIFICAR ESTO TAMBIEN SE PODRA ESCOGER MULTIPLE SO ES TYPE MULTIPLE
    GetOptionsCheckBoxes(answers, generalArray)
    {
        let checkboxes = [];
        for(let i=0; i<generalArray.length; i++)
        {
            let isChecked = answers.find((answer)=>answer==generalArray[i])!=null;
            checkboxes.push(<label key={i+"Chk"} className="checkContainer"><input type="checkbox" defaultChecked={isChecked}
            value ={generalArray[i]} onChange={this.handleCheckAnswer} /><div className="TagContainer" key={"Div"+i}><span className="CheckBoxTag">{generalArray[i]}</span></div><span className="checkmark"></span><br/></label>)
        }
        return checkboxes;
    }
    handleChangeRadioAnswer = (event) =>
    {
        let newAnswer = this.state.tempOptions.answer;
        if(event.target.checked)
        {
            newAnswer = [event.target.value];
        }
        let newTempOptions = this.state.tempOptions;
        newTempOptions["answer"] = newAnswer;
        this.setState({tempOptions:newTempOptions});
    }
    GetOptionsRadioButtons(answer, generalArray)
    {
        let radioButtons = [];
        for(let i=0; i<generalArray.length; i++)
        {
            let isChecked = (answer == generalArray[i]);
            let radioButton = (<React.Fragment>
                <input key={i+"Rd"} type="radio" onChange={this.handleChangeRadioAnswer} id={i+"Rd"} name="answer" value={generalArray[i]} defaultChecked={isChecked}/>
                <label className="radioLabel">{generalArray[i]}</label>
                <br/>
            </React.Fragment>);
            radioButtons.push(radioButton);
        }
        return radioButtons;
    }
    GetAnswerOverlayForm = () =>
    {
        let currentOptions = this.state.tempOptions.options;
        let checkBoxInputs = null;
        if(this.state.tempOptions.mutiple)
        {
            let currentAnswers  = this.state.tempOptions.answer;
            checkBoxInputs = this.GetOptionsCheckBoxes(currentAnswers,currentOptions);
        }
        else
        {
            let currentAnswer  = this.state.tempOptions.answer[0];
            checkBoxInputs = this.GetOptionsRadioButtons(currentAnswer,currentOptions);
        }
        return (
            <div className="overlayed">
                <form className = "elementEditForm" onSubmit={this.editAreas} >
                    <h3>{this.state.overlayed.extras.placeholder+": "}</h3>
                    <hr/>
                    {checkBoxInputs}
                    <button type="button" onClick= {this.cancelEdit}>Finish</button>
                </form>
            </div>
        );
    }
    GetNestedOverlayForm = () =>
    {
        let overlayed = this.state.nestedOverlayed;
        if(overlayed.overlay)
        {
            return (
                <div className="overlayed">
                <form className = "elementEditForm" onSubmit={this.editAction} >
                <span className="putLeft">{overlayed.extras.placeholder+": "}</span>
                <textarea rows="2" name="newValue" defaultValue={overlayed.extras.value} type="text" className="myInput" placeholder={overlayed.extras.placeholder +"..."} required/>
                <button type="submit">Save changes</button>
                <button type="button" onClick= {this.cancelNestedEdit}>Cancel</button>
            </form>
            </div>
            );
        }
        return null;
    }
    GetOptionsOverlayedForm = () =>
    {
        let options = this.renderOptionsList(this.state.overlayed.extras.id);
        let nestedOverlay = this.GetNestedOverlayForm();
        return (
            <div className="overlayed">
            <div className="elementEditForm">
            <form className = "elementEditForm" onSubmit={this.addOption} >
                <span className="putLeft">{this.state.overlayed.extras.placeholder+": "}</span>
                <input name="newValue" type="text" className="myInput" placeholder={this.state.overlayed.extras.placeholder +"..."} required/>
                <button type="submit">Add</button>
            </form>
            <ul className="myUL">
                {options}
                <br/>
            </ul>
            <button type="button" onClick= {this.cancelEdit}>OK</button>
            </div>
            {nestedOverlay}
            </div>
        );
    }
    handleManageOptions = (event) =>
    {
        event.preventDefault();
        let extras = {
            id: this.state.listElements.length,
            placeholder: "Add Extra",
            type: "Options",
        }
        this.setState({overlayed:{
            overlay: true,
            extras:extras,
        }})
    }
    handleManageAnswer = (event) =>
    {
        event.preventDefault();
        let extras = {
            placeholder: "Select Answer",
            type: "Answer",
        }
        this.setState({overlayed:{
            overlay: true,
            extras:extras,
        }})
    }
    handleChangeType = (event) =>
    {
        let multiple = event.target.value=="multiple"?true:false;
        let newTempOptions = this.state.tempOptions;
        newTempOptions.mutiple = multiple;
        newTempOptions.answer = [];
        this.setState({tempOptions:newTempOptions});
    } 
    render() {  
        let overlay = this.GetOverlayedForm();
        return (
            <React.Fragment>
                <h3 className="Date" title={this.state.date}>Exam Date: {this.state.date} <button  onClick= {this.handleEdit}>Edit</button></h3>
                <h3 className="SubAreaEdit" title= {this.state.subarea}>Sub-Area Assigned: {this.state.subarea} <button onClick={this.handleEdit}>Edit</button></h3>
                <form id="admExmForm" onSubmit={this.newElement} className="Examheader">
                    <div id="inputsDiv" >
                        <span className="qtag"> Question:</span>
                        <textarea rows="2" name="question" type="text" className="myInput" placeholder="Title..." required/>
                        <div id="breakAnswer"/>
                        <span className="qtag"> Options:</span><button onClick={this.handleManageOptions} type="button" className="AddAnswerBtn">Manage Options</button>
                        <span className="Atag">Answer:</span><button onClick={this.handleManageAnswer} type="button" className="AddAnswerBtn">Manage Answer</button>
                        <br/>
                        <span className="qtag"> Type:</span>
                        <div className="RadioContainer">
                            <input type="radio" onChange={this.handleChangeType} id="single" name="type" value="single" defaultChecked={true}/>
                            <label className="radioLabel" >Single</label>
                            <input type="radio" onChange={this.handleChangeType} id="multiple" name="type" value="multiple" defaultChecked={false}/>
                            <label className="radioLabel" >Multiple</label>
                            <label className="Stag">Score: </label>
                            <input className="NumberInput" type="number" id="score" name="score" min="1" max="100" placeholder="1 to 100" required/>
                        </div>
                        <button type="submit" className="addBtn">Add Question</button>
                    </div>
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
        if(this.state.tempOptions.answer[0] == null)
        {
            alert("You need to provide a valid answer!");
            return;
        }
        let newQuestion =
        {
            optionElement: this.state.tempOptions,
            question: event.target.question.value,
            score: event.target.score.value
        };
        let newList = this.state.listElements.slice();
        newList.push(newQuestion);
        document.getElementById("admExmForm").reset();
        this.setState({listElements:newList});
        this.setState({tempOptions: {
            options: [],
            answer: [],
            mutiple: false,
        }})
    }
    handleEdit = (event) =>
    {
        event.preventDefault();
        let element = event.target.parentElement;
        let extras = {};

        if(element.className == "ExamQuestion")
        {  
            extras = {
                placeholder: "Question",
                id: element.id,
                value: element.title,
                type: "Question",
                question: true
            };
        }
        else if(element.className == "SubAreaEdit")
        {
            extras = 
            {
                placeholder: "Sub-Area",
                value: element.title,
                type: "Sub-Area",
            }
        }
        else if (element.className == "Date")
        {
            extras  =
            {
                placeholder: "Date",
                value: element.title,
                type: "Date",
            }
        }
        else 
        {
            extras =
            {
                id: element.id,
                placeholder: "Option",
                value: element.title,
            }
            this.setState({nestedOverlayed: {
                overlay: true,
                extras:extras
            }});
            return;
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
        else if(this.state.nestedOverlayed.extras)
        {
            let nestedExtras = this.state.nestedOverlayed.extras;
            let newOptions = this.state.tempOptions.options.slice();
            newOptions[nestedExtras.id] = event.target.newValue.value;
            let newTempOptions = this.state.tempOptions;
            newTempOptions.options = newOptions;
            this.setState({tempOptions:newTempOptions});
            this.setState({nestedOverlayed: {
                overlay: false,
                extras:null}
            });
            return;
        }
        else this.setState({date:event.target.newValue.value})
        this.setState({overlayed: {
            overlay: false,
            extras:null}
        });
    }
    
    PopulateSubAreaOptions = () =>
    {
        let areasBody = [];
        //I will change this
        areasBody.push(<option key="1" value="Calculus I">Calculus I</option>);
        areasBody.push(<option key="2" value="Geometry">Geometry</option>);
        areasBody.push(<option key="3" value="World History">World History</option>);
        return areasBody;
    }
    handleSelect = (event) =>
    {
        event.preventDefault();
        this.setState({subarea:event.target.value});
    }
    GetSubAreasOverlayForm = () =>
    {
        let areasBox = this.PopulateSubAreaOptions();
        return (
            <div className="overlayed">
            <form className = "elementEditForm" >
                <span className="etag">{this.state.overlayed.extras.placeholder+": "}</span>
                <br/>
                <select name="newValue" defaultValue={this.state.subarea} onChange={this.handleSelect} className="SelectOption">
                    {areasBox}
                </select>
                <br/>
                <button type="button" onClick= {this.cancelEdit}>OK</button>
            </form>
            </div>
        );
    }
    
}
 
export default NewExamList;