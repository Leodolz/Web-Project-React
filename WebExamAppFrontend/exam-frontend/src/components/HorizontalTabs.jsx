import React, { Component } from 'react';

class HorizontalTabs extends Component {
    state = { 
        allTabs: this.props.allTabs,
        currentTab: this.props.default,
        staticbody: this.props.staticbody
    }

    renderButtons = () =>
    {
        let allTabs = this.state.allTabs;
        let allButtons = [];
        let buttonClass = "tablinks";
        for(let i=0;i<allTabs.length; i++)
        {
            if(allTabs[i].id == this.state.currentTab)
                buttonClass= "active";
            else buttonClass = "tablinks"
            allButtons.push(
                <button key={allTabs[i].id+" "+allTabs[i].title} title={allTabs[i].id} className={buttonClass} onClick={this.openTab}>{allTabs[i].title}</button>
            );
        }
        return(
            <div className="tab">
                {allButtons}
            </div>
        );
    }

    openTab = (event) =>
    {
        this.setState({currentTab: event.target.title});
    }

    GetTabBody = () =>
    {
        return (this.state.allTabs[this.state.currentTab].body);
    }

    render() { 
        let buttons = this.renderButtons();
        let body = this.GetTabBody();
        return ( 
            <>
                {buttons}
                {body}
            </>
         );
    }
}
 
export default HorizontalTabs;