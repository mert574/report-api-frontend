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
import {Link} from "react-router-dom";

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={Link} to="/">Reporter</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem><NavLink tag={Link} to="/login">Login</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to="/report">Transactions Report</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to="/list">List Transactions</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to="/info/transaction">Transaction Info</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to="/info/client">Get Client</NavLink></NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
