import React from 'react'
import { connect } from 'react-redux';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>this is transaction.</div>);
    }
}

export default connect()(Transaction);
