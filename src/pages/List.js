import React from 'react'
import { connect } from 'react-redux';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>this is list.</div>);
    }
}

export default connect()(List);