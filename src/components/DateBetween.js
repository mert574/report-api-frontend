import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Row, Col, Label} from 'reactstrap';
import { parseDate } from '../Util';

class DateBetween extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "fromDate": new Date("2000-01-01"),
            "toDate": new Date("2018-12-31")
        }

        this.handleChange = this.handleChange.bind(this);
        this.pushChange = this.pushChange.bind(this);
    }

    componentDidMount() {
        this.pushChange('fromDate', this.state.fromDate);
        this.pushChange('toDate', this.state.toDate);
    }

    handleChange(name, date) {
        if (name === 'fromDate' && (this.state.toDate - date) < 0) {
            this.setState({'toDate': date});
            this.pushChange('toDate', date);
        } else if (name === 'toDate' && (date - this.state.fromDate) < 0) {
            this.setState({'fromDate': date});
            this.pushChange('fromDate', date);
        }

        this.setState({[name]: date});
        this.pushChange(name, date);
    }

    pushChange(key, val) {
        if(this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange({[key]: parseDate(val) });
        }
    }

    render() {
        return (
            <Row className={this.props.className}>
                <Col xs="6">
                    <Label htmlFor="startDate">Start Date</Label>
                    <DatePicker
                        id="fromDate"
                        dateFormat="yyyy-MM-dd"
                        selected={this.state.fromDate}
                        selectsStart
                        startDate={this.state.fromDate}
                        endDate={this.state.endDate}
                        onChange={d=>this.handleChange('fromDate', d)}
                        className="form-control"
                        showYearDropdown
                        showMonthDropdown
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
                        onChange={d=>this.handleChange('toDate', d)}
                        className="form-control"
                        showYearDropdown
                        showMonthDropdown
                    />
                </Col>
                <Col sm="12"><small className="form-text text-muted">Query will be limited between these dates.</small></Col>
            </Row>
        );
    }
}

export default DateBetween;
