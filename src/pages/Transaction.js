import React from 'react'
import { connect } from 'react-redux';
import {Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import { sendRequest } from '../Util';
import ReactJson from 'react-json-view';
import Loader from '../components/Loader';

class Transaction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactionId: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.onQuery = this.onQuery.bind(this);
    }

    handleChange(event) {
        const {id, value} = event.target;
        this.setState({[id]: value});
    }

    async onQuery(event) {
        event.preventDefault();
        this.setState({"json": {}, "loading": true});

        const resp = await sendRequest('/transaction', 'POST', {
            "transactionId": this.state.transactionId
        });

        this.setState({"json": resp, "loading": false});
    }

    render() {
        return (<Row>
            <Col md="12">
                <legend>Query <kbd>/transaction</kbd></legend>
                <hr />
            </Col>
            <Col md="5">
            <Form autoComplete="off" onSubmit={this.onQuery}>
                <FormGroup>
                    <Label htmlFor="transactionId">Transaction ID</Label>
                    <Input type="text" maxLength="32" id="transactionId" 
                        onChange={this.handleChange}
                        placeholder="Enter Transaction ID" required/>
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

export default connect()(Transaction);
