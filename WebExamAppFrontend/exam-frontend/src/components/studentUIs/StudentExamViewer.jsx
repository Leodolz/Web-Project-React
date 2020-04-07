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
        if(this.props.exam)
        {
            console.log(this.props.exam);
            this.state.listElements = this.props.exam.listElements;
            this.state.date= this.props.exam.date;
            this.state.subarea= this.props.exam.subarea;
            this.state.score= this.props.exam.score;
        }
    }
    

    render() {  
       let accordions = this.GetExamBody();
        return (
            <React.Fragment>
                <h2>Final Score: {this.state.score}/100</h2>
                <h3 title={this.state.date}>Exam Date: {this.state.date}</h3>
                <h3 className="SubAreaEdit" title= {this.state.subarea}>Sub-Area Assigned: {this.state.subarea} </h3>
                <Accordion accordions= {accordions}/>

            </React.Fragment>
          );
    }
    GetExamBody = () =>
    {
        let examBody = [];
        for(let i=0;i<this.state.listElements.length;i++)
        {
            let container = 
            {
                title: (i+1)+". "+this.state.listElements[i].title,
                body: (
                    <ul className="myUL">
                     <li className="StudentAnswer" title={this.state.listElements[i].studentAnswer} key={"Q"+i}><span className="etag">Your Answer: </span>{this.state.listElements[i].studentAnswer.join(", ")}<br/></li> 
                     <li className="ExamAnswer" title = {this.state.listElements[i].answer} key={"A"+i}><span className="etag">Answer: </span>{this.state.listElements[i].answer.join(", ")}</li>
                     <li className="ExamScore" title = {this.state.listElements[i].studentScore} key={"A"+i}><span className="etag">Score: </span>{this.state.listElements[i].studentScore+"/"+this.state.listElements[i].score}</li>
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