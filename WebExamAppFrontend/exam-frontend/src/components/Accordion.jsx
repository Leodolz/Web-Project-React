import React, { Component } from 'react';

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
        while(parentPane.parentElement)
        {
            parentPane.style.maxHeight = (contentPane.scrollHeight+parentPane.scrollHeight)+"px";
            contentPane = parentPane;
            parentPane = parentPane.parentElement;
        }
        
    }
    GetGenericAccordion = (title, body) =>
    {
        return(
            <React.Fragment key={title}>
                <button onClick={this.handleAccordion} className="accordion">{title}</button>
                <div className = "panelAcc">
                 {body}
                </div>
            </React.Fragment>
        );
    }
    renderAccordions(entries)
    {
        let accordions = [];
        for(let i=0;i<entries.length;i++)
        {
            let accordion;
            if(entries[i].body.title)  
            { 
                let children = entries[i].body;
                accordion= this.renderNested(entries[i],children);
            }
            else if(entries[i].body.multi)
            {
                let nestedEntries = entries[i].body.multi;
                accordion = this.renderNested(entries[i],nestedEntries)
            }
            else
            {
                accordion= this.GetGenericAccordion(entries[i].title,entries[i].body);
            } 
            accordions.push(accordion);
        }
        return accordions;
    }
    renderNested = (entry, children) =>
    {
        let accordionchildren;
        if(children instanceof Array)
            accordionchildren = this.renderAccordions(children);
        else accordionchildren = this.renderAccordions([children]);
        return (
            this.GetGenericAccordion(
                entry.title,
                (
                    <React.Fragment>
                        {entry.body.before}
                        {accordionchildren}
                        {entry.body.after}
                    </React.Fragment>
                ))
        )
    }
    render() { 
        
        let accordionsFromTop = this.renderAccordions(this.props.accordions);
        return (
            <React.Fragment>
                <br/>
            {accordionsFromTop}
            </React.Fragment>
        );
    }
}
 
export default Accordion;