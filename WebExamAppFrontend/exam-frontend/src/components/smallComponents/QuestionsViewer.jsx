import React, { Component } from 'react';
import Accordion from '../Accordion';
import CustomCheckBoxes from './CustomCheckBoxes';

class QuestionsViewer extends Component {
    state = {  }
    render() 
    {
        let accordions = this.GetQuestionsBody(this.props.questions); 
        return (
            <Accordion accordions={accordions} />
          );
    }

    GetQuestionsBody = (questions) =>
    {
        let questionsList = [];
        let editButton = null;
        let closeButton = null;
        let chooseBox = null;
        let manageQuestions = null;
        if(this.props.editQuestion && this.props.hideComponent)
        {
            editButton = <button onClick= {this.props.editQuestion} className="edit">Edit</button>;
            closeButton = <button type="button" onClick={this.props.hideComponent} className="close">x</button>;
        }
        else if(this.props.manageQuestions)
            manageQuestions = <button onClick = {this.props.manageQuestions}>Manage Questions</button> 
        for(let i=0;i<questions.length;i++)
        {
            if(this.props.selectQuestions)
                    chooseBox = <CustomCheckBoxes 
                    generalArray = {[questions[i].questionId]} 
                    answers = {[this.props.checked[i]]} 
                    handleCheckAnswer = {this.props.handleCheckAnswer} 
                    title = {questions[i].questionId}
                    checkContained = {true}/>
            let optionsList = (
                <ul className = "myUL">
                    {this.renderOptionList(questions[i])}
                </ul>
                );
            let container = 
            {
                title: "Question "+(i+1),
                body: (<React.Fragment>
                     {chooseBox}
                    <p id ={i} className = "questionTitle">
                        {questions[i].title}
                        {editButton}
                        {closeButton}
                    </p>
                    {optionsList}
                    </React.Fragment>
                )
            }
            questionsList.push(container);
        }
        return [
            {
                title:"Questions",
                body:
                {
                    after:(
                        <>
                            {manageQuestions}
                        <hr/>
                        </>),
                    multi: questionsList
                },
            },
        ];
    }
    
    renderOptionList = (question) => 
    {
        let list = [];
        list.push(<li key={"Options"+question.questionId} className= "questionTitle"><p>Options:</p></li>);
        for(let i=0;i<question.optionElement.options.length;i++)
        {
            let listElement = (
                <li className="optionElement" title = {question.optionElement.options[i]} key={"O"+i}><p>{(i+1)}. {question.optionElement.options[i]}</p></li>
            )
            list.push(listElement);
        }
        list = this.renderAnswersList(question, list);
        return list;
    }
    renderAnswersList =(question, list) =>
    {
        let answerTag = null;
        if(question.optionElement.multiple)
            answerTag="Answers:";
        else answerTag="Answer:";
        list.push(<li className= "questionTitle" key={"AN"+question.questionId}>{answerTag}</li>);
        for(let i=0;i<question.optionElement.answer.slice().length;i++)
        {
            let listElement = (
                <li className="optionElement" key={"A"+i+""+question.Id}><p>{question.optionElement.answer[i]}</p></li>
            );
            list.push(listElement);
        }
        return list;
    }    
}
 
export default QuestionsViewer;