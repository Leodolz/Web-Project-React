import React, { Component } from 'react';
import Accordion from '../Accordion';

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
        let editButton = <button onClick= {this.props.editQuestion} className="edit">Edit</button>;
        let closeButton = <button type="button" onClick={this.props.hideComponent} className="close">x</button>;
        for(let i=0;i<questions.length;i++)
        {
            let container = 
            {
                title: "Question "+(i+1),
                body: (<>
                    <p id ={i} className = "questionTitle">
                        {questions[i].title}
                        {editButton}
                        {closeButton}
                    </p>
                    <ul className="myUL">
                        {this.renderOptionList(questions[i])}
                    </ul>
                    </>
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
                            <button >Manage Questions</button> 
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
        if(question.optionElement.type == "Multiple")
            answerTag="Answers:";
        else answerTag="Answer:";
        list.push(<li className= "questionTitle" key={"AN"+question.questionId}>{answerTag}</li>);
        for(let i=0;i<question.optionElement.answer.length;i++)
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