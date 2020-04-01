import React, { Component } from 'react';

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
            this.setState({listElements:this.props.exam.listElements});
            this.setState({date: this.props.exam.date});
            this.setState({subarea: this.props.exam.subarea});
            this.setState({score: this.props.exam.score});
        }
    }
    
    renderList = () => 
    {
        
        let list = [];
        for(let i=0;i<this.state.listElements.length;i++)
        {
            let listElement = (
            <React.Fragment key={"QA"+i}>
                <li className="ExamQuestion" title={this.state.listElements[i].title} key={"Q"+i}><span className="etag">{(i+1)+". "}</span>{this.state.listElements[i].title}</li> 
                <li className="StudentAnswer" title={this.state.listElements[i].studentAnswer} key={"Q"+i}><span className="etag">Your Answer: </span>{this.state.listElements[i].studentAnswer}Score: {this.state.listElements[i].score}</li> 
                <li className="ExamAnswer" title = {this.state.listElements[i].answer} key={"A"+i}><span className="etag">Answer: </span>{this.state.listElements[i].answer}</li>
            </React.Fragment> 
            )
            list.push(listElement);
        }
        return list;
    }
   
    render() {  
       
        return (
            <React.Fragment>
                <h3 title={this.state.date}>Exam Date: {this.state.date}</h3>
                <h3 className="SubAreaEdit" title= {this.state.subarea}>Sub-Area Assigned: {this.state.subarea} </h3>
                <ul className="myUL">
                    {this.renderList()}
                    <br/>
                </ul>
            </React.Fragment>
          );
    }

}
 
export default StudentExamViewer;