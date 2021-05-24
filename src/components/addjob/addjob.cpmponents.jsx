import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import { Form, Button, Table } from 'react-bootstrap';
import { setCurrentClientName, setCurrentClientId, } from '../../redux/clients/client.actions';
import { setCurrentJobId, setCurrentJobAddress, setCcurrentJobDescription, setCurrentJobStart, setCurrentJobFinish } from '../../redux/job/job.actions';
import Cookies from 'universal-cookie';

class Addclient extends Component {
    constructor() {
        super();
        this.onClickButton = this.onClickButton.bind(this);
    }

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

        if (this.props.currentClientId >= 0) {
            axios.get(
                '/all_clients',
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
        }

        if (this.props.currentJobId >= 0) {
            axios.get(
                '/all_jobs',
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

    onClickButton = (id) => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        axios.delete(
            `/job_delete/${id}`,
            config
        ).then(() => {
            console.log('job deleted')
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
        const job = [];
        for (let i = 0; i < this.props.currentJobAddress.length; i++) {
            job.push({
                id: this.props.currentJobId[i],
                address: this.props.currentJobAddress[i],
                description: this.props.currentJobDescription[i],
                start: this.props.currentJobStart[i],
                finish: this.props.currentJobFinish[i],
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
                                <option key={`client${client.id}`} value={client.id}>{client.name}</option>
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
                            <th>Address</th>
                            <th>Description</th>
                            <th>Job start</th>
                            <th>Job prediction to finish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {job.map((job) => (
                            <tr key={`job${job.id}`}>
                                <td key={`address${job.id}`}>{job.address}</td>
                                <td key={`description${job.id}`}>{job.description}</td>
                                <td key={`start${job.id}`}>{job.start}</td>
                                <td key={`finish${job.id}`}>{job.finish}</td>
                                <td><Button variant="danger" onClick={this.onClickButton.bind(this, job.id)}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>


            </div >
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