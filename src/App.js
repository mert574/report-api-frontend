import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import Navbar from './Components/Navbar';
import Index from './Pages/Index';
import Login from './Pages/Login';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar/>
                    <Container>
                        <Route path="/" exact component={Index} />
                        <Route path="/login" component={Login} />
                    </Container>
                </div>
            </Router>
        );
    }
}

export default App;
