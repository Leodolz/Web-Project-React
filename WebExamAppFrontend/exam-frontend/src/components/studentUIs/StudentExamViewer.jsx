import React, { Component } from 'react';
import Accordion from '../Accordion';
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
            <React.Fragment>
                <h2>Final Score: {this.props.exam.studentTotalScore}/100</h2>
                <h3 title={this.state.fromDate}>Date From: {this.state.fromDate}</h3>
                <h3 title={this.state.untilDate}>Date Until: {this.state.untilDate}</h3>
                <h3 className="SubAreaEdit" title= {this.state.subarea}>Sub-Area Assigned: {this.state.subarea} </h3>
                <Accordion accordions= {accordions}/>

            </React.Fragment>
          );
    }
    RenderArrayList = (array) =>
    {
        let list = [];
        for(let i =0;i<array.length;i++)
        {
            let listElement = (
                <li className="optionElement" key={array[i]+" "+i}><p>{(i+1)}. {array[i]}</p></li>
            )
            list.push(listElement);
        }
        return list;
    }
    GetExamBody = () =>
    {
        let examBody = [];
        
        for(let i=0;i<this.state.listElements.length;i++)
        {
            let plural = "";
            if(this.state.listElements[i].answer.length>1)
                plural = "s";
            let container = 
            {
                title: (i+1)+". "+this.state.listElements[i].title,
                body: (
                    <ul className="myUL">
                     <li className="questionTitle" title={this.state.listElements[i].studentAnswer} key={"Q"+i}><span className="etag">Your Answer{plural}: </span></li>
                     {this.RenderArrayList(this.state.listElements[i].studentAnswer)} 
                     <li className="questionTitle" title = {this.state.listElements[i].answer} key={"A"+i}><span className="etag">Correct Answer{plural}: </span></li>
                     {this.RenderArrayList(this.state.listElements[i].answer)}
                     <li className="optionElement" title = {this.state.listElements[i].studentScore} key={"S"+i}><span className="etag">Score: </span>{this.state.listElements[i].studentScore+"/"+this.state.listElements[i].score}</li>
                    </ul>
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
                        <React.Fragment> 
                        <hr/>
                        </React.Fragment>),
                    multi: examBody
                },
            },
        ];
    }

}
 
export default StudentExamViewer;