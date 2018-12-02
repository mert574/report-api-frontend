import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import Loader from '../components/Loader';

class Logs extends React.Component {
    constructor() {
        super();
        this.state = { "loading": false };

        this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {
        this.refresh();
    }

    async refresh() {
        this.setState({"loading": true});
        const logs = await fetch('/actuator/logfile');
        document.getElementById('logs').value = await logs.text();
        this.setState({"loading": false});
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <Row>
                        <Col tag="legend">Logs <Loader visible={this.state.loading} /></Col>
                        <Col><Button color="primary" className="float-right" onClick={this.refresh}>Refresh</Button></Col>
                    </Row>
                    <hr />
                </Col>
                <Col xs="12">
                    <textarea id="logs" className="form-control" rows="32" readOnly></textarea>
                </Col>
            </Row>
        );
    };
}

export default Logs;
