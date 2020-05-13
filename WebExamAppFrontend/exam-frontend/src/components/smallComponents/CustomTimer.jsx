import React, { Component } from 'react';

class CustomTimer extends Component {
    state = 
    { 
        hours: this.props.hours,
        minutes: this.props.minutes,
        seconds: this.props.seconds,
    }

    constructor(props)
    {
        super(props);
        this.StartTimer();
    }
    StartTimer = () =>
    {
        this.myInterval = setInterval(()=>
        {
            const{seconds,minutes,hours} = this.state;
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                  seconds: seconds - 1
                }))
              }
            else 
            {
                if (minutes === 0) 
                {
                    if(hours === 0)
                        clearInterval(this.myInterval);
                    else
                        this.setState(({ hours }) => ({
                            hours: hours - 1,
                            minutes: 59,
                            seconds: 59
                        }))                  
                }
                else   
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }));
            }
        },1000);
    }

    render() { 
        const {hours,minutes,seconds} = this.state;
        if(hours < 1 && minutes < 1 && seconds < 1)
            this.props.stopTimer();
        return ( 
            <span className="examTimer">Time left: {hours}:{minutes<10?`0${minutes}`:minutes}:{seconds<10?`0${seconds}`:seconds}</span>
        );
    }
}
 
export default CustomTimer;