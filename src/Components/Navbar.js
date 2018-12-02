import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Countdown from './Countdown';
import Health from './Health';

class myNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            "isOpen": false
        };
    }

    toggle() {
        this.setState({ "isOpen": !this.state.isOpen });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="lg">
                    <NavbarBrand tag={Link} to="/">Reporter</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem><NavLink tag={Link} to="/report">Transactions Report</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to="/list">List Transactions</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to="/info/transaction">Get Transaction</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to="/info/client">Get Client</NavLink></NavItem>
                        </Nav>

                        <Nav className="ml-auto" navbar>
                            <NavItem><NavLink tag={Link} to="/logs">Check Logs</NavLink></NavItem>
                            <NavItem className={this.props.tokenExists ? 'd-none' : ''}><NavLink tag={Link} to="/login">Login</NavLink></NavItem>
                        </Nav>

                        <Health className="badge navbar-text" />

                        <div className={"authenticated badge badge-pill badge-info " + (this.props.tokenExists ? '' : 'd-none')}>
                            Authenticated for: <Countdown />
                        </div>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { "tokenExists": state.Login.token && state.Login.token.length > 0 };
};

export default connect(mapStateToProps)(myNavbar);
