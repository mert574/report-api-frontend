import React, {Component} from 'react';

import '../Stylesheets/Login.css';
import {Link, Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import { updateToken } from '../actions';
import {Row, Col} from 'reactstrap';
import { Query } from '../Util';

class Login extends Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.changed = this.changed.bind(this);

        this.state = {
            "email": "",
            "password": "",
            "waiting": false
        }
    }

    async submit(event) {
        event.preventDefault();

        this.setState({ "waiting": true });

        setTimeout(() => {
            this.setState({ "waiting": false });
            this.props.dispatch(updateToken("sdfjdsfjkldsfjlksdfjklsfdjklsfdjksfd")); 
        }, 1000);

        Query(event.target.action, "POST", {"email": "em", "password": "passw"});
        
        /*const url = `${event.target.action}?email=${this.state.email}&password=${this.state.password}`;
        const post = await fetch(url, { "method": event.target.method }).then(r=>r.json());

        if (post.status === "APPROVED") {
            this.props.dispatch(updateToken(post.token));
        } else if (post.status === "DECLINED") {
           this.setState({"message": post.message});
       }*/
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
                <Col id="loginPage" lg="6" className="m-auto">
                    <legend className="fadeIn second">Get Valid Token</legend>

                    <form id="loginForm" method="POST" 
                        action="http://localhost:8080/merchant/user/login"
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
                            <input type="submit" className="btn btn-primary form-control fadeIn third" value="Log In" />
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
