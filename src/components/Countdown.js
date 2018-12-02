import React from 'react';
import { paddedNum } from '../Util';
import { connect } from 'react-redux';
import { tokenExpired } from '../actions';

class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.interval = 1000;
        this.left = props.left;

        this.state = {
            "started": false,
            "mins": 0,
            "seconds": 0
        }

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        if (!this.state.started && this.props.tokenExists) {
            this.start();
        }
    }

    calcTimeLeft() {
        const diffSec = Math.floor((this.props.expiresOn - Date.now()) / 1000);
        const leftSec = diffSec % 60;
        const leftMins = (diffSec - leftSec) / 60;

        return { "mins": leftMins, "seconds": leftSec };
    }

    start() {
        const { mins, seconds } = this.calcTimeLeft();
        this.setState({ "started": true, mins, seconds }, this.tick);
    }

    componentDidUpdate() {
        if (!this.state.started && this.props.tokenExists) {
            this.start();
        }
    }

    tick() {
        const {mins, seconds} = this.state;

        if (seconds === 0) {
            if (mins > 0) {
                this.setState({"mins": mins-1, "seconds": 59});
            } else {
                this.setState({"started": false});
                this.props.dispatch(tokenExpired());
                return;
            }
        } else {
            this.setState({"seconds": seconds-1});
        }

        setTimeout(this.tick, this.interval);
    }

    render() {
        return (<>{paddedNum(this.state.mins)}:{paddedNum(this.state.seconds)} {this.left}</>);

    }
}

const mapStateToProps = state => {
    return { 
        "tokenExists": state.Login.token && state.Login.token.length > 0,
        "expiresOn": state.Login.expiresOn || 0
    };
};

export default connect(mapStateToProps)(Countdown);
