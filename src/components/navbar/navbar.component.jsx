import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navbar.styles.scss';
import Cookies from 'universal-cookie';

class NavBar extends Component {
    constructor() {
        super();
        this.onClickButton = this.onClickButton.bind(this);
    }

    onClickButton = () => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        console.log(config);
        axios.delete(
            '/logout',
            config
        ).then(() => {
            const cookies = new Cookies();
            cookies.remove('token');
            console.log('logout succesful')
        }).catch(() => {
            console.log('logout fail')
        })
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/payments">Payments</Nav.Link>
                        <NavDropdown title="Add" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/addworker">Worker</NavDropdown.Item>
                            <NavDropdown.Item href="/addclient">Client</NavDropdown.Item>
                            <NavDropdown.Item href="/addjob">Job</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/">login</NavDropdown.Item>
                            <NavDropdown.Item href="/register">register</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.onClickButton}>logout</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    currentClientName: state.client.currentClientName,
    currentClientId: state.client.currentClientId,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(NavBar)