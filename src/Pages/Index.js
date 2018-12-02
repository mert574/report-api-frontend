import React, { Component } from 'react';

import {Col, Row} from "reactstrap";
import Loader from '../components/Loader';

export default class Index extends Component {
    render() {
        return (
            <Row>
                <Col className="text-center">
                    <h1>Reporting API Query Dashboard</h1>
                    <hr />
                    <p className="lead">
                        After getting Auth Token from the login page using your credentials, <br />
                        you can start using the system.
                    </p>

                    <Loader />
                </Col>
            </Row>);
    }
}
