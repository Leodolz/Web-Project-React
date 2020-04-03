import React, { Component } from 'react';
import TextOverlayForm from '../smallComponents/TextOverlayForm';
import CustomCheckBoxes from '../smallComponents/CustomCheckBoxes';
import CustomRadioButtons from '../smallComponents/CustomRadioButtons';
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
                console.log("Found");
                return true;
            }
        }
        return false;
    }

    deleteOption = (event) =>
    {
        let newArray = this.DeleteComponentInArray(event,this.state.tempOptions.options);
        let answer = this.state.tempOptions.answer.slice();
        if(!this.findItemsInArray(answer,newArray))
            answer = [];
        this.setState({tempOptions:
            {   
                options: newArray,
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
    //TODO: MAKE ALL OF THIS METHODS INTO REACT COMPONENTS (JSX) 
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
                case "Options":
                    return this.GetOptionsOverlayedForm();
                default:
                    return this.GetAnswerOverlayForm();
            }   
        }
        else return null;
    }
    GetDateOverlayForm = () =>
    {
        return <TextOverlayForm editAction={this.editAction} overlayed = {this.state.overlayed} cancelEdit={this.cancelEdit} />;
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
        this.registerNewAnswer(event,true);
    }
    handleChangeRadioAnswer = (event) =>
    {
        this.registerNewAnswer(event,false);
    }
    registerNewAnswer = (event,multiple) =>
    {
        let newAnswers = this.state.tempOptions.answer;
        if(multiple)
        {
            if(event.target.checked)
            {
                let answer = event.target.value;
                newAnswers.push(answer);
            }
            else
            {
                newAnswers = newAnswers.filter((value,index,arr)=>value!=event.target.value);
            }
        }
        else
        {
            if(event.target.checked)
            {
                newAnswers = [event.target.value];
            }
        }
        let newTempOptions = this.state.tempOptions;
        newTempOptions["answer"] = newAnswers;
        this.setState({tempOptions:newTempOptions});
    }
   
    //TODO: REFACTOR THIS INTO A JSX COMPONENT
    GetAnswerOverlayForm = () =>
    {
        let currentOptions = this.state.tempOptions.options;
        let checkBoxInputs = null;
        if(this.state.tempOptions.mutiple)
        {
            let currentAnswers  = this.state.tempOptions.answer;
            checkBoxInputs = (<CustomCheckBoxes handleCheckAnswer = {this.handleCheckAnswer} answers ={currentAnswers} generalArray={currentOptions}/>);
        }
        else
        {
            let currentAnswer  = this.state.tempOptions.answer[0];
            checkBoxInputs = (<CustomRadioButtons handleChangeRadioAnswer = {this.handleChangeRadioAnswer} answer = {currentAnswer} generalArray={currentOptions} />);
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
        return (<QuestionEditor date={this.state.date} handleEdit= {this.handleEdit} subarea={this.state.subarea}
            newElement = {this.newElement} handleManageOptions={this.handleManageOptions} handleManageAnswer={this.handleManageAnswer}
            handleChangeType={this.handleChangeType} showActive={this.showActive} renderedList={this.renderList()} overlay={overlay} />
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
        //TODO: FINISH REFACTORING INTRODUCING ALL FUNCTIONS THAT DON'T SHARE WITH OTHER COMPONENTS
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
    
}
 
export default NewExamList;