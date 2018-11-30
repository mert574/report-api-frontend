import React from 'react'
import { connect } from 'react-redux';

class Client extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>this is client.</div>);
    }
}

export default connect()(Client);
