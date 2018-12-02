import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { updateToken } from '../actions';
import {Row, Col} from 'reactstrap';
import { sendRequest } from '../Util';

class Login extends Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.changed = this.changed.bind(this);

        this.state = {
            "email": "",
            "password": "",
            "waiting": false,
            "message": null
        }
    }

    async submit(event) {
        event.preventDefault();

        this.setState({ "waiting": true, "message": null });

        const post = await sendRequest(event.target.action, "POST", {
            "email": this.state.email,
            "password": this.state.password
        });

        if (post.status === "APPROVED") {
            this.props.dispatch(updateToken(post.token));
        } else if (post.status === "DECLINED") {
            this.setState({"message": post.message, "waiting": false});
        } else if (post.hasOwnProperty('Error')) {
            this.setState({"message": post.Error, "waiting": false});
        }
    }

    changed(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        if (this.props.token) {
            return (<Redirect to="/" />);
        }

        return (
            <Row>
                <Col md="12">
                    <legend>Query <kbd>/merchant/user/login</kbd></legend>
                    <hr />
                </Col>
                <Col id="loginPage" lg="6" className="m-auto">
                    <legend className="fadeIn second">Get Valid Token</legend>

                    <form id="loginForm" method="POST" 
                        action="/merchant/user/login"
                        onSubmit={this.submit}
                        onChange={this.changed}
                    >
                        <div className="form-group">
                            <label htmlFor="email" className="fadeIn first">Email address</label>
                            <input id="email" type="email" name="email" className="form-control fadeIn first" placeholder="E-Mail" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="fadeIn first">Password</label>
                            <input id="password" type="password" name="password" className="form-control fadeIn first" placeholder="Password" required />
                        </div>

                        <div className="form-group">
                            <input type="submit" className="btn btn-primary form-control fadeIn third" value="Get Token" />
                            <div className={'progress ' + (this.state.waiting ? '':'d-none')}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{"width": "100%"}}></div>
                            </div>
                            <div>{this.state.message}</div>
                        </div>
                    </form>
                </Col>
            </Row>);
    }
}

const mapStateToProps = state => {
    return { "token": state.Login.token };
};

export default connect(mapStateToProps)(Login);
