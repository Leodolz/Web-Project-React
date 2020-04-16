import React, { Component } from 'react';
import AnswerManager from '../smallComponents/AnswerManager';
import TextOverlayForm from '../smallComponents/TextOverlayForm';

class QuestionEditor extends Component {
    state =
    {  
        listElement : 
        {
            question: null,
            score: null
        },
        nestedOverlayed : 
        {
            overlay: false,
            extras : null
        },
        tempOptions: 
        {
            options: [],
            answer: [],
            multiple: false,
        },
        overlayed : 
        {
            overlay: false,
            extras : null,
            type: "Option",
        },
    }
    constructor(props)
    {
        super(props);
        if(this.props.preDefQuestion)
        {
            console.log("Entered here")
            let preDefQuestion = this.props.preDefQuestion;
            this.state.listElement = {
                question: preDefQuestion.title,
                score: preDefQuestion.score
            };
            this.state.tempOptions = preDefQuestion.optionElement;
        }
    }
    editAction = (event) =>
    {
        event.preventDefault();
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
    cancelNestedEdit = (event) =>
    {
        this.setState({nestedOverlayed: {
            overlay: false,
            extras:null
        }})
    
    }
    handleEdit = (event) =>
    {
        event.preventDefault();
        let element = event.target.parentElement;
        let extras =
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

    deleteOption = (event) =>
    {
        let newArray = this.props.DeleteComponentInArray(event,this.state.tempOptions.options);
        let answer = this.state.tempOptions.answer.slice();
        if(!this.props.findItemsInArray(answer,newArray))
            answer = [];
        this.setState({tempOptions:
            {   
                options: newArray,
                answer: answer,
                multiple: this.state.tempOptions.multiple,
            }
        });
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
    
    GetAnswer= (answer) =>
    {
        let newTempOptions = this.state.tempOptions;
        newTempOptions.answer = answer;
        this.setState({tempOptions:newTempOptions});
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
            multiple: this.state.tempOptions.multiple,
        }});
        document.getElementById("optionsAdder").reset();
    }
    GetAnswerOverlayForm = () =>
    {
        return <AnswerManager cancelEdit={this.cancelEdit} getAnswer={this.GetAnswer}
        placeholder= {this.state.overlayed.extras.placeholder} tempOptions={this.state.tempOptions}
        preDefAnswer = {this.state.tempOptions.answer}/>
    }
    GetNestedOverlayForm = () =>
    {
        let overlayed = this.state.nestedOverlayed;
        if(overlayed.overlay)
        {
            return (
                <TextOverlayForm editAction={this.editAction} overlayed={overlayed} cancelEdit={this.cancelEdit}/>
            );
        }
        return null;
    }
    GetOptionsOverlayedForm = () =>
    {
        let options = this.renderOptionsList(this.state.overlayed.extras.id);
        let nestedOverlay = this.GetNestedOverlayForm();
        
        return(<TextOverlayForm editAction={this.editAction}
            overlayed={this.state.overlayed} 
            body={nestedOverlay}
            addOption = {this.addOption} 
            cancelEdit={this.cancelEdit}
            list = {options}/>)
    }
    handleManageOptions = (event) =>
    {
        event.preventDefault();
        let extras = {
            placeholder: "Add Option",
            type: "Options",
        }
        this.setState({overlayed:{
            overlay: true,
            extras:extras,
        }});
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
    cancelEdit = (event) => 
    {
        this.setState({overlayed: {
            overlay: false,
            extras:null
        }})
    }
    handleChangeType = (event) =>
    {
        let multiple = event.target.value=="multiple"?true:false;
        let newTempOptions = this.state.tempOptions;
        newTempOptions.multiple = multiple;
        console.log(multiple);
        newTempOptions.answer = [];
        this.setState({tempOptions:newTempOptions});
    } 

    GetOverlayedForm = () => 
    {
        switch(this.state.overlayed.extras.type)
        {
            case "Options":
                return this.GetOptionsOverlayedForm();
            case "Answer":
                return this.GetAnswerOverlayForm();
            default:
                return null;
        }   
    }
    editQuestion = (event) =>
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
            title: event.target.question.value,
            score: parseInt(event.target.score.value)
        };
        this.props.getEditedQuestion(newQuestion);
        document.getElementById("admExmForm").reset();
        this.setState({tempOptions: {
            options: [],
            answer: [],
            multiple: false,
        }});
    }

    render() { 
        let overlay = null;
        if(this.state.overlayed.overlay)
        {
            overlay = this.GetOverlayedForm();
        }
        let submitMethod = this.returnNewQuestion;
        let submitLabel = "Add Question";
        if(this.props.editing)
        {
            submitLabel = "Save Changes";
            submitMethod = this.editQuestion;
            
        }
        return (
            <React.Fragment>
                <form id="admExmForm" onSubmit={submitMethod} className="Examheader">
                    <div id="inputsDiv" >
                        <span className="qtag"> Question:</span>
                        <textarea rows="2" name="question" type="text" defaultValue={this.state.listElement.question} className="myInput" placeholder="Title..." required/>
                        <div id="breakAnswer"/>
                        <span className="qtag"> Options:</span><button onClick={this.handleManageOptions} type="button" className="AddAnswerBtn">Manage Options</button>
                        <span className="Atag">Answer:</span><button onClick={this.handleManageAnswer} type="button" className="AddAnswerBtn">Manage Answer</button>
                        <br/>
                        <span className="qtag"> Type:</span>
                        <div className="RadioContainer">
                            <input type="radio" onChange={this.handleChangeType} id="single" name="type" value="single" defaultChecked={!this.state.tempOptions.multiple}/>
                            <label className="radioLabel" >Single</label>
                            <input type="radio" onChange={this.handleChangeType} id="multiple" name="type" value="multiple" defaultChecked={this.state.tempOptions.multiple}/>
                            <label className="radioLabel" >Multiple</label>
                            <label className="Stag" >Score: </label>
                            <input className="NumberInput" defaultValue={this.state.listElement.score} type="number" id="score" name="score" min="1" max="100" placeholder="1 to 100" required/>
                        </div>
                        <button type="submit" className="addBtn">{submitLabel}</button>
                    </div>
                </form>
                {overlay}
            </React.Fragment>);
    }
    returnNewQuestion = (event) =>
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
            title: event.target.question.value,
            score: parseInt(event.target.score.value)
        };
        this.props.getNewQuestion(newQuestion);
        document.getElementById("admExmForm").reset();
        this.setState({tempOptions: {
            options: [],
            answer: [],
            multiple: false,
        }})
    }
}
 
export default QuestionEditor;