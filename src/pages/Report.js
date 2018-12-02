import React from 'react'
import { connect } from 'react-redux';
import {Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { sendRequest } from '../Util';
import ReactJson from 'react-json-view';
import Loader from '../components/Loader';
import DateBetween from '../components/DateBetween';

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "loading": false,
            "json": {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.onQuery = this.onQuery.bind(this);
    }

    handleChange(change) {
        this.setState(change);
    }

    handleChangeForm(event) {
        const {id, value} = event.target;
        this.setState({[id]: value.length > 0 ? value : undefined});
    }

    async onQuery(event) {
        event.preventDefault();
        this.setState({"json": {}, "loading": true});

        const resp = await sendRequest('/transactions/report', 'POST', {
            ...this.state,
            "loading": undefined,
            "json": undefined
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
                <Form autoComplete="off" onSubmit={this.onQuery} onChange={this.handleChangeForm}>
                    <DateBetween className="form-group" onChange={this.handleChange} />

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