import React from 'react'
import { connect } from 'react-redux';
import {Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { parseDate, sendRequest } from '../Util';
import ReactJson from 'react-json-view';
import Loader from '../components/Loader';

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "startDate": new Date("2000-01-01"),
            "endDate": new Date("2018-12-31"),
            "loading": false,
            "json": {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.onQuery = this.onQuery.bind(this);
    }

    handleChange(name, date) {
        this.setState({[name]: date});
    }

    async onQuery(event) {
        event.preventDefault();
        this.setState({"json": {}, "loading": true});

        const resp = await sendRequest('/transactions/report', 'POST', {
            "fromDate": parseDate(this.state.startDate),
            "toDate": parseDate(this.state.endDate)
        });

        this.setState({"json": resp, "loading": false});
    }

    render() {
        return (<Row>
            <Col md="12">
                <legend>Query <kbd>/transactions/report</kbd></legend>
                <hr />
            </Col>
            <Col md="5">
                <Form autoComplete="off" onSubmit={this.onQuery}>
                    <Row className="form-group">
                        <Col xs="6">
                            <Label htmlFor="startDate">Start Date</Label>
                            <DatePicker
                                id="startDate"
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.startDate}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={d=>this.handleChange('startDate', d)}
                                className="form-control"
                                showYearDropdown
                                showMonthDropdown
                                block
                            />
                        </Col>
                        <Col xs="6">
                            <Label htmlFor="endDate">End Date</Label>
                            <DatePicker
                                id="endDate"
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.endDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={d=>this.handleChange('endDate', d)}
                                className="form-control"
                                showYearDropdown
                                showMonthDropdown
                                block
                            />
                        </Col>
                        <Col sm="12"><small className="form-text text-muted">Query will be limited between these dates.</small></Col>
                    </Row>
                    <FormGroup>
                        <Label htmlFor="merchantId">Merchant ID</Label>
                        <Input type="number" id="merchantId" placeholder="Enter Merchant ID" />
                        <small className="form-text text-muted">Optional</small>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="acquirerId">Acquirer ID</Label>
                        <Input type="number" id="acquirerId" placeholder="Enter Acquirer ID" />
                        <small className="form-text text-muted">Optional</small>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" color="primary" block>Query</Button>
                    </FormGroup>
                </Form>
            </Col>
            <Col md="7">
                <Label htmlFor="result">Query Result <Loader visible={this.state.loading} /></Label>
                <ReactJson src={this.state.json} name="QueryResult" theme="eighties" />
            </Col>
        </Row>);
    }
}

export default connect()(Report);