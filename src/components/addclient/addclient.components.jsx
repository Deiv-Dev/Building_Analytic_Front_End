import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import { Form, Button, Table } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { setCurrentClientName, setCurrentClientId } from '../../redux/clients/client.actions';

class Addclient extends Component {
    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        if (this.props.currentClientId >= 0) {
            axios.get(
                '/all_clients',
                config
            )
                .then(res => {
                    res.data.forEach(element => {
                        this.props.setCurrentClientName(
                            element.name
                        );
                        this.props.setCurrentClientId(
                            element.id
                        );
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

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

    onClickButton = (id) => {
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
            `/client_delete/${id}`,
            config
        ).then(() => {
            console.log('client deleted')
        }).catch(() => {
            console.log('delete fail')
        })
    }

    render() {
        const client = [];
        for (let i = 0; i < this.props.currentClientName.length; i++) {
            client.push({
                id: this.props.currentClientId[i],
                name: this.props.currentClientName[i]
            });
        };
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
                            <th>Client List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {client.map((client) => (
                            <tr key={`client${client.id}`}>
                                <td key={`client${client.name}`}>{client.name}</td>
                                <td><Button variant="danger" onClick={this.onClickButton.bind(this, client.id)}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentClientName: client => dispatch(setCurrentClientName(client)),
    setCurrentClientId: client => dispatch(setCurrentClientId(client))
})

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    currentClientName: state.client.currentClientName,
    currentClientId: state.client.currentClientId
})

export default connect(mapStateToProps, mapDispatchToProps)(Addclient);