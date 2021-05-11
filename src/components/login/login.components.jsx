import React from 'react';
import './login.styles.scss';
import { connect } from 'react-redux';
import axios from '../../axios';
import { Form, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';

import { setCurentUser } from '../../redux/users/user.actions';

class Login extends React.Component {

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`/login`, {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                this.props.setCurentUser(
                    res.data.user.name
                )
                const cookies = new Cookies();
                cookies.set('token', `${res.data.access_token}`);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <Form className='login_form' onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
              </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
            </Button>
                { this.props.currentUser}
            </Form>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login)