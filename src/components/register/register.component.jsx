//import logo from './logo.svg';
import React from 'react';
import axios from '../../axios';
import { Form, Button } from 'react-bootstrap';

//function App() {
class Register extends React.Component {

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        // const user = {
        //   name: this.state.name,
        //   email: this.state.email,
        //   password: this.state.password
        // };

        axios.post(`/register`, {
            // user
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="App" >
                <Form className='login_form' onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter name" onChange={this.handleChange} />
                    </Form.Group>
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
                    <Button variant="primary" type="submit">
                        Register
            </Button>
                </Form>
            </div>
        );
    }
}
export default Register;
