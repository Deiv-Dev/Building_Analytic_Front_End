import React, { Component } from 'react';
import { connect } from 'react-redux';
import './addworker.styles.scss';
import axios from '../../axios';
import { Form, Button, Table } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { setCurrentWorkerName, setCurrentWorkerId } from '../../redux/worker/worker.actions';

class Addworker extends Component {
    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        if (this.props.currentWorkerId >= 0) {
            axios.get(
                '/all_workers',
                config
            )
                .then(res => {
                    res.data.forEach(element => {
                        this.props.setCurrentWorkerName(
                            element.name
                        )
                        this.props.setCurrentWorkerId(
                            element.id
                        )
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
            '/worker',
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
            `/worker_delete/${id}`,
            config
        ).then(() => {
            console.log('worker deleted')
        }).catch(() => {
            console.log('delete fail')
        })
    }

    render() {
        const worker = [];
        for (let i = 0; i < this.props.currentWorkerName.length; i++) {
            worker.push({
                id: this.props.currentWorkerId[i],
                name: this.props.currentWorkerName[i]
            });
        };
        console.log(worker);
        return (
            <div>
                <Form className='login_form' onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Add worker</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Workers name" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                     </Button>
                </Form>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Workers list</th>
                        </tr>
                    </thead>
                    <tbody>
                        {worker.map((worker) => (
                            <tr key={`worker${worker.id}`}>
                                <td key={`workername${worker.id}`}>{worker.name}</td>
                                <td><Button variant="danger" onClick={this.onClickButton.bind(this, worker.id)}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentWorkerName: state.worker.currentWorkerName,
    currentWorkerId: state.worker.currentWorkerId
})

const mapDispatchToProps = dispatch => ({
    setCurrentWorkerName: worker => dispatch(setCurrentWorkerName(worker)),
    setCurrentWorkerId: worker => dispatch(setCurrentWorkerId(worker)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Addworker);