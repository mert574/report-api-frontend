import React, { Component } from 'react';

import {Col, Row} from "reactstrap";

export default class Index extends Component {
    render() {
        return (
            <Row>
                <Col className="text-center">
                    <h1>Reporting API Query Dashboard</h1>
                    <hr />
                    <p class="lead">
                        After getting Auth Token from the login page using your credentials, <br />
                        you can start using the system.
                    </p>
                </Col>
            </Row>);
    }
}
