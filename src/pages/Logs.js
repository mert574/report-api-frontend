import React from 'react';
import {Row, Col, Button} from 'reactstrap';

class Logs extends React.Component {
    componentDidMount() {
        this.refresh();
    }

    async refresh() {
        const logs = await fetch('/actuator/logfile');
        document.getElementById('logs').value = await logs.text();
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <Row>
                        <Col tag="legend">Logs</Col>
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
