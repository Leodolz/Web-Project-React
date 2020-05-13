import React, { Component } from 'react';
import Accordion from '../Accordion';
import ImagePreview from '../smallComponents/ImagePreview';
class StudentExamViewer extends Component {
    state = {
        listElements : this.props.exam.listElements,
        date: this.props.exam.date,
        subarea: this.props.exam.subarea,
        score: this.props.exam.score
      }
    constructor(props)
    {
        super(props);
        document.title = "Exam Viewer";
        if(this.props.exam)
        {
            console.log(this.props.exam);
            this.state.listElements = this.props.exam.listElements;
            this.state.fromDate= this.props.exam.fromDate;
            this.state.untilDate = this.props.exam.untilDate;
            this.state.subarea= this.props.exam.subarea;
            this.state.score= this.props.exam.score;
        }
    }
    

    render() {  
       let accordions = this.GetExamBody();
        return (
            <>
                <h2>Final Score: {this.props.exam.studentTotalScore}/100</h2>
                <h3 title={this.state.fromDate}>Date From: {this.state.fromDate}</h3>
                <h3 title={this.state.untilDate}>Date Until: {this.state.untilDate}</h3>
                <h3 className="SubAreaEdit" title= {this.state.subarea}>Sub-Area Assigned: {this.state.subarea} </h3>
                <Accordion accordions= {accordions}/>

            </>
          );
    }
    RenderArrayList = (array) =>
    {
        let list = [];
        for(let i =0;i<array.length;i++)
        {
            let listElement = (
                <li className="optionElement" key={array[i]+" "+i}>
                    <p>{(i+1)}. {array[i]}</p>
                </li>
            )
            list.push(listElement);
        }
        return list;
    }
    RenderOptionList = (options,count) =>
    {
        let renderedOptions = [];
        for(let i=0; i<options.length; i++)
        {
            renderedOptions.push(
                <li className="optionElement" key={"options"+i+"Question"+count}>
                    <>
                        <p>{(i+1)}. {options[i].title}</p>
                        <br/>
                        <ImagePreview option="option" contextId={options[i].optionId}/>
                    </>
                </li>
            );
        }
        return renderedOptions;
    }
    GetExamBody = () =>
    {
        let examBody = [];
        const {listElements} = this.state;
        for(let i=0;i<listElements.length;i++)
        {
            let plural = "";
            if(listElements[i].answer.length>1)
                plural = "s";
            let container = 
            {
                title: (i+1)+". "+listElements[i].title,
                body: (
                    <>
                        <ImagePreview option="question" contextId={listElements[i].questionId}/>
                        <ul className="myUL">
                        <li className="questionTitle" key={"Options Q"+i}><span className="etag">Options:</span></li>
                        {this.RenderOptionList(listElements[i].options,i)}
                        <li className="questionTitle" title={listElements[i].studentAnswer} key={"Q"+i}><span className="etag">Your Answer{plural}: </span></li>
                        {this.RenderArrayList(listElements[i].studentAnswer)} 
                        <li className="questionTitle" title = {listElements[i].answer} key={"A"+i}><span className="etag">Correct Answer{plural}: </span></li>
                        {this.RenderArrayList(listElements[i].answer)}
                        <li className="optionElement" title = {this.state.listElements[i].studentScore} key={"S"+i}><span className="etag">Score: </span>{listElements[i].studentScore+"/"+listElements[i].score}</li>
                        </ul>
                    </>
                )
            }
            examBody.push(container);
        }
        return [
            {
                title:"Details",
                body:
                {
                    after:(
                        <> 
                            <hr/>
                        </>),
                    multi: examBody
                },
            },
        ];
    }

}
 
export default StudentExamViewer;