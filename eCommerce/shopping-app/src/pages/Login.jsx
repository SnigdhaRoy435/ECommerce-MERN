import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { login } from '../actions/userAction';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import FormContainer from '../components/shared/FormContainer'

const Login = ({ location, history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch
        dispatch(login(email, password))
        console.log(dispatch(login(email, password)))
    }

    return (
        <>
            <FormContainer>
                <h1>SIGN IN</h1>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
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
                    <Button type="submit" variant="primary">SIGNIN</Button>
                </Form><br />
                <Row>
                    <Col>
                        New customer ?
                        <Link
                            to={redirect ? `register?redirect=${redirect}` : '/register'}>
                            Register
                         </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default Login;