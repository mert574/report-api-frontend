import React from 'react'
import { connect } from 'react-redux';
import {Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { parseDate, sendRequest } from '../Util';
import ReactJson from 'react-json-view';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "fromDate": new Date("2000-01-01"),
            "toDate": new Date("2018-12-31"),
            "json": {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.onQuery = this.onQuery.bind(this);
    }

    handleChange(event) {
        const {id, value} = event.target;
        this.setState({[id]: value.length > 0 ? value : undefined});
    }

    handleChangeDate(id, date) {
        this.setState({[id]: date});
    }

    async onQuery(event) {
        event.preventDefault();
        this.setState({"json": {}, "loading": true});

        const resp = await sendRequest('http://localhost:8080/transaction/list', 'POST', {
            ...this.state,
            "json": undefined, "loading": undefined,
            "fromDate": parseDate(this.state.fromDate),
            "toDate": parseDate(this.state.toDate)
        });

        this.setState({"json": resp, "loading": false});
    }

    render() {
        return (<Row>
            <Col md="12">
                <legend>Query <kbd>/transaction/list</kbd></legend>
                <hr />
            </Col>
            <Col md="5">
                <Form autoComplete="off" onSubmit={this.onQuery}>
                    <Row className="form-group">
                        <Col xs="6">
                            <Label htmlFor="startDate">Start Date</Label>
                            <DatePicker
                                id="fromDate"
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.fromDate}
                                selectsStart
                                startDate={this.state.fromDate}
                                endDate={this.state.endDate}
                                onChange={d=>this.handleChangeDate('fromDate', d)}
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
                                selected={this.state.toDate}
                                selectsEnd
                                startDate={this.state.fromDate}
                                endDate={this.state.toDate}
                                onChange={d=>this.handleChangeDate('toDate', d)}
                                className="form-control"
                                showYearDropdown
                                showMonthDropdown
                                block
                            />
                        </Col>
                        <Col sm="12"><small className="form-text text-muted">Query will be limited between these dates.</small></Col>
                    </Row>
                    
                    <FormGroup>
                        <Label htmlFor="status">Status</Label>
                        <Input type="select" id="status" defaultValue="">
                            <option hidden disabled value="">Select Status</option>
                            <option></option>
                            <option>APPROVED</option>
                            <option>WAITING</option>
                            <option>DECLINED</option>
                            <option>ERROR</option>
                        </Input>
                        <small className="form-text text-muted">Optional</small>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="operation">Operation</Label>
                        <Input type="select" id="operation" defaultValue="">
                            <option hidden disabled value="">Select Operation</option>
                            <option></option>
                            <option>DIRECT</option>
                            <option>REFUND</option>
                            <option>3D</option>
                            <option>3DAUTH</option>
                            <option>STORED</option>
                        </Input>
                        <small className="form-text text-muted">Optional</small>
                    </FormGroup>
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
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Input type="select" id="paymentMethod" defaultValue="">
                            <option hidden disabled value="">Select Payment Method</option>
                            <option></option>
                            <option>CREDITCARD</option>
                            <option>CUP</option>
                            <option>IDEAL</option>
                            <option>GIROPAY</option>
                            <option>MISTERCASH</option>
                            <option>STORED</option>
                            <option>PAYTOCARD</option>
                            <option>CEPBANK</option>
                            <option>CITADEL</option>
                        </Input>
                        <small className="form-text text-muted">Optional</small>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="errorCode">Error Code</Label>
                        <Input type="select" id="errorCode" defaultValue="">
                            <option hidden disabled value="">Select Error Code</option>
                            <option></option>
                            <option>Do not honor</option>
                            <option>Invalid Transaction</option>
                            <option>Invalid Card</option>
                            <option>Not sufficient funds</option>
                            <option>Incorrect PIN</option>
                            <option>Invalid country association</option>
                            <option>Currency not allowed</option>
                            <option>3-D Secure Transport Error</option>
                            <option>Transaction not permitted to cardholder</option>                            
                        </Input>
                        <small className="form-text text-muted">Optional</small>
                    </FormGroup>

                    <Row className="form-group">
                        <Col xs="6">
                            <FormGroup>
                                <Label htmlFor="filterField">Filter Field</Label>
                                <Input type="select" id="filterField" defaultValue="">
                                    <option hidden disabled value="">Select Filter Field</option>
                                    <option></option>
                                    <option>Transaction UUID</option>
                                    <option>Customer Email</option>
                                    <option>Reference No</option>
                                    <option>Custom Data</option>
                                    <option>Card PAN</option>
                                </Input>
                                <small className="form-text text-muted">Optional</small>
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                                <Label htmlFor="filterValue">Filter Value</Label>
                                <Input type="text" maxLength="256" id="filterValue" placeholder="Enter Filter Value" />
                                <small className="form-text text-muted">Optional</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label htmlFor="page">Page</Label>
                        <Input type="number" id="page" placeholder="Enter Page" min="1" />
                        <small className="form-text text-muted">Optional</small>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" color="primary" block>Query</Button>
                    </FormGroup>
                </Form>
            </Col>
            <Col md="7">
                <Label htmlFor="result">Query Result</Label>
                <ReactJson src={this.state.json} name="QueryResult" theme="eighties" />
            </Col>
        </Row>);
    }
}

export default connect()(List);
