import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import { Form, Button, Table } from 'react-bootstrap';
import Cookies from 'universal-cookie';

class Addclient extends Component {
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        const bodyParameters = {
            name: this.state.name,
        };

        axios.post(
            '/client',
            bodyParameters,
            config
        )
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render(currentUser) {
        return (
            <div>
                <Form className='login_form' onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Add client</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Clients name" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                     </Button>
                </Form>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Addclient);