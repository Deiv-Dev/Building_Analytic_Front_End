import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import './navbar.styles.scss';
import Cookies from 'universal-cookie';

import { setCurentUser } from '../../redux/users/user.actions';

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
            this.props.setCurentUser(
                null
            )
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
                        <Link to={'/dashboard'} className="nav-link">Dashboard</Link>
                        <Link to={'/payments'} className="nav-link">Payments</Link>
                        {/* <Link to="/courses?sort=name" /> */}
                        <NavDropdown title="Add" id="collasible-nav-dropdown">
                            <Link to={'/addworker'} className="dropdown-item">Worker</Link>
                            <Link to={'/addclient'} className="dropdown-item">Client</Link>
                            <Link to={'/addjob'} className="dropdown-item">Job</Link>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <Link to={'/'} className="dropdown-item">login</Link>
                            <Link to={'/register'} className="dropdown-item">register</Link>
                            {
                                this.props.currentUser ? (
                                    <NavDropdown.Item><Button variant="danger" onClick={this.onClickButton}>logout</Button></NavDropdown.Item>
                                ) : (
                                    null
                                )
                            }
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

const mapDispatchToProps = dispatch => ({
    setCurentUser: user => dispatch(setCurentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)