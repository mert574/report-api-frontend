import React from 'react';
import { sendRequest } from '../Util';

class Health extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        
        this.interval = 10000;
        this.colors = {
            "good": "#50ff50",
            "bad": "#ff5252"
        };

        this.state = { 
            "color": this.colors.good
        };
    }
    
    componentWillMount() {
        this.tick();
    }

    async tick() {
        const request = await sendRequest('/actuator/health', 'GET');
        if (request.status === 'UP') {
            this.setState({ "color": this.colors.good });
        } else {
            this.setState({ "color": this.colors.bad });
        }

        setTimeout(this.tick, this.interval);
    }

    render() {
        return (<div className={this.props.className}>API Status: <span style={{"color": this.state.color}}>•</span></div>);
    }
}

export default Health;
