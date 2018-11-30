import React from 'react'
import { connect } from 'react-redux';
import {Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { parseDate, sendRequest } from '../Util';

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "startDate": new Date(2000, 1, 1),
            "endDate": new Date(2000, 1, 10)
        }

        this.handleChange = this.handleChange.bind(this);
        this.onQuery = this.onQuery.bind(this);
    }

    handleChange(name, date) {
        this.setState({[name]: date});
    }

    async onQuery(event) {
        event.preventDefault();

        const area = document.getElementById('result');
        const resp = await sendRequest('http://localhost:8080/transactions/report', 'POST', {
            "fromDate": parseDate(this.state.startDate),
            "toDate": parseDate(this.state.endDate)
        });

        area.value = JSON.stringify(resp);
    }

    render() {
        return (<Row>
            <Col md="6">
            <Form autoComplete="off" onSubmit={this.onQuery}>
                <Row className="form-group">
                    <Col sm="6">
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
                    <Col sm="6">
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
            <Col md="6">
                <Label htmlFor="result">Query Result</Label>
                <textarea id="result" className="form-control" rows="3"></textarea>
            </Col>
        </Row>);
    }
}

export default connect()(Report);