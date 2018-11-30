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
import Transaction from './pages/Transaction';
import Client from './pages/Client';

class App extends Component {
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
                        
                    </Container>
                </>
            </Router>
        );
    }
}

export default App;
