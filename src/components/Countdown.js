import React from 'react';
import {paddedNum} from '../Util';
import { connect } from 'react-redux';
import { tokenExpired } from '../actions';

class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.interval = 1000;
        this.left = props.left;

        this.state = {
            "mins": 10,
            "seconds": 0,
            "started": false
        }

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        if (!this.state.started && this.props.tokenExists) {
            this.start();
        }
    }

    start() {
        this.setState({"started": true, "mins": 10, "seconds": 0});
        this.tick();
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
    return { "tokenExists": state.Login.token && state.Login.token.length > 0 };
};

export default connect(mapStateToProps)(Countdown);
