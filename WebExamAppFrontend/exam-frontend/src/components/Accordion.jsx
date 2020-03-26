import React, { Component } from 'react';
import ResponsiveTable from './ExamTable'

class Accordion extends Component {
    handleAccordion = (event) =>
    {
        event.preventDefault();
        if(event.target.className == "accordion")
            event.target.className = "activeAcc";
        else event.target.className = "accordion";
        let contentPane = event.target.nextElementSibling;
        if(contentPane.style.maxHeight)
        {
            contentPane.style.maxHeight = null;
        } 
        else 
        {
            contentPane.style.maxHeight = contentPane.scrollHeight+"px";
        }
        let parentPane = event.target.parentElement;
        parentPane.style.maxHeight =  (contentPane.scrollHeight+parentPane.scrollHeight+5)+"px";
       
    }
    GetAdminAccordion = ()=>
    {
        return (
            <React.Fragment>
                <button onClick={this.handleAccordion} className="accordion">Exams</button>
                <div className = "panelAcc">
                    <p>This section displays every exam <button>Edit</button></p>
                    <button>Add new Exam</button>
                </div>
                <button onClick={this.handleAccordion} className="accordion">Students</button>
                <div className = "panelAcc">
                    <p>This section displays every student <button>Edit</button> </p>
                    <button>Add new Student</button>
                </div>
                <button onClick={this.handleAccordion} className="accordion">Areas</button>
                <div className = "panelAcc">
                    <p>This section displays every area <button>Edit</button></p>
                    <button onClick={this.handleAccordion} className="accordion">SubAreas</button>
                    <div className = "panelAcc">
                       <p>EverySubArea <button>Edit</button></p>
                    </div>
                    <button>Add Area</button>
                </div>
            </React.Fragment>
           );
    }
    GetStudentAccordion = ()=>
    {
        return (
            <React.Fragment>
                <button onClick={this.handleAccordion} className="accordion">Past Exams</button>
                <div className = "panelAcc">
                 <ResponsiveTable/> 
                </div>
                <button onClick={this.handleAccordion} className="accordion">Comming Exams</button>
                <div className = "panelAcc">
                    <ResponsiveTable/>
                </div>
            </React.Fragment>
           );
    }
    render() { 
        let shownAccordion = null;
        if(this.props.admin)
            shownAccordion = this.GetAdminAccordion();
        else shownAccordion = this.GetStudentAccordion();
        return (
            <React.Fragment>
                <br/>
            {shownAccordion}
            </React.Fragment>
        );
    }
}
 
export default Accordion;