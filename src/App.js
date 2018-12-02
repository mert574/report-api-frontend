import React, { Component } from 'react';

import './Stylesheets/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import {Container} from "reactstrap";
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Login from './pages/Login';
import Report from './pages/Report';
import List from './pages/List';
import Logs from './pages/Logs';
import Transaction from './pages/Transaction';
import Client from './pages/Client';
import { connect } from 'react-redux';
import { updateToken } from './actions';

class App extends Component {
    componentWillMount() {
        const authToken = localStorage.getItem('AuthToken');
        const authExpire = localStorage.getItem('AuthExpire');

        if (authExpire - Date.now() > 0) {
            this.props.dispatch(updateToken(authToken, authExpire));
        }
    }

    render() {
        return (
            <Router>
                <>
                    <Navbar/>
                    <Container id="container">
                        <Route path="/" exact component={Index} />
                        <Route path="/login" component={Login} />
                        <Route path="/report" component={Report} />
                        <Route path="/list" component={List} />
                        <Route path="/info/transaction" component={Transaction} />
                        <Route path="/info/client" component={Client} />
                        <Route path="/logs" component={Logs} />
                    </Container>
                </>
            </Router>
        );
    }
}

export default connect()(App);
