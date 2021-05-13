import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import { Form, Button, Table } from 'react-bootstrap';
import { setCurrentClientName, setCurrentClientId, } from '../../redux/clients/client.actions';
import { setCurrentJobId, setCurrentJobAddress, setCcurrentJobDescription, setCurrentJobStart, setCurrentJobFinish } from '../../redux/job/job.actions';
import Cookies from 'universal-cookie';

class Addclient extends Component {
    // axios
    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        axios.get(
            '/allclients',
            config
        )
            .then(res => {
                res.data.forEach(element => {
                    this.props.setCurrentClientName(
                        element.name
                    )
                    this.props.setCurrentClientId(
                        element.id
                    )
                    // this.props.setCurentClient(currentClient => ({
                    //     array: [...currentClient.array, element.name]
                    // }))

                });
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(
            '/alljobs',
            config
        )
            .then(res => {
                res.data.forEach(element => {
                    this.props.setCurrentJobId(
                        element.id
                    );
                    this.props.setCurrentJobAddress(
                        element.address
                    );
                    this.props.setCcurrentJobDescription(
                        element.description
                    );
                    this.props.setCurrentJobStart(
                        element.start
                    );
                    this.props.setCurrentJobFinish(
                        element.finish
                    );
                    // this.props.setCurentClient(currentClient => ({
                    //     array: [...currentClient.array, element.name]
                    // }))
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        event.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        const bodyParameters = {
            address: this.state.address,
            client_id: this.state.client_id,
            description: this.state.description,
            start: this.state.start,
            finish: this.state.finish,
        };

        axios.post(
            '/job',
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

    render() {
        const client = [];
        for (let i = 0; i < this.props.currentClientId.length; i++) {
            client.push({
                id: this.props.currentClientId[i],
                name: this.props.currentClientName[i]
            });
        };
        const job = [];
        for (let i = 0; i < this.props.currentJobId.length; i++) {
            client.push({
                id: this.props.currentJobId[i],
            });
        };
        return (
            <div className='center_form'>
                <Form className='login_form' onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Label>New job</Form.Label>
                        <Form.Control type="text" name='address' placeholder="address" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" name='description' placeholder="description" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Sellect client</Form.Label>
                        <Form.Control as="select" name="client_id" onChange={this.handleChange}>
                            {client.map((client) => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>When job starts</Form.Label>
                        <Form.Control type="date" name='start' placeholder="start" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>When job ends</Form.Label>
                        <Form.Control type="date" name='finish' placeholder="finish" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                     </Button>
                    {this.props.currentUser}
                </Form>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            {job.map((job) => (
                                <option key={job.id} value={job.id}>{job.id}</option>
                            ))}
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
    currentClientName: state.client.currentClientName,
    currentClientId: state.client.currentClientId,
    currentUser: state.user.currentUserId,
    currentJobId: state.job.currentJobId,
    currentJobAddress: state.job.currentJobAddress,
    currentJobDescription: state.job.currentJobDescription,
    currentJobStart: state.job.currentJobStart,
    currentJobFinish: state.job.currentJobFinish
})

const mapDispatchToProps = dispatch => ({
    setCurrentClientName: client => dispatch(setCurrentClientName(client)),
    setCurrentClientId: client => dispatch(setCurrentClientId(client)),
    setCurrentJobId: job => dispatch(setCurrentJobId(job)),
    setCurrentJobAddress: job => dispatch(setCurrentJobAddress(job)),
    setCcurrentJobDescription: job => dispatch(setCcurrentJobDescription(job)),
    setCurrentJobStart: job => dispatch(setCurrentJobStart(job)),
    setCurrentJobFinish: job => dispatch(setCurrentJobFinish(job))
})

export default connect(mapStateToProps, mapDispatchToProps)(Addclient);