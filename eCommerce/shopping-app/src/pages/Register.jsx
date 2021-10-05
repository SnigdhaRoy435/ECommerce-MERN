import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { register } from '../actions/userAction';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import FormContainer from '../components/shared/FormContainer'

const Register = ({ location, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnPassword, setCnPassword] = useState('');
    const [msg, setMsg] = useState('');


    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch
        if (password !== cnPassword) {
            setMsg('Password do not Match')
        } else {
            dispatch(register(name, email, password))
        }

        //console.log(dispatch(login(email, password)))
    }

    return (
        <>
            <FormContainer>
                <h1>Register</h1>
                {error && <Message variant="danger">{error}</Message>}
                {msg && <Message variant="danger">{msg}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            placeholder="Enter your Name"
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group><br />
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter your Email"
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group><br />

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Enter your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group><br />
                    <Form.Group controlId="cnPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={cnPassword}
                            placeholder="Re-enter your Password"
                            onChange={(e) => setCnPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group><br />
                    <Button type="submit" variant="primary">Register</Button>
                </Form><br />
                <Row>
                    <Col>
                        Already have Account ! ?
                        <Link
                            to={redirect ? `login?redirect=${redirect}` : '/login'}>
                            Login
                         </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default Register;