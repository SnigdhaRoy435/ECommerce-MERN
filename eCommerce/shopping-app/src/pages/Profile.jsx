import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import { getUserDetail, userUpate } from '../actions/userAction';
import { listMyOrder } from '../actions/orderAction'
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import { LinkContainer } from 'react-router-bootstrap'


const Profile = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails;
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, orders, error: errorOrders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetail('profile'));
                dispatch(listMyOrder());
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }


    }, [history, userInfo, user, dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch
        dispatch(userUpate({ id: user._id, name, email, password }))

        //console.log(dispatch(login(email, password)))
    }

    return (
        <>
            <Row>
                <Col md={3}>
                    <h1>Update Information</h1>
                    {error && <Message variant="danger">{error}</Message>}
                    {success && <Message variant="success">Profile updated</Message>}

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

                        <Button type="submit" variant="primary">Update</Button>
                    </Form><br />
                </Col>
                <Col md={9}>
                    <h1>My Orders</h1>
                    {
                        loadingOrders ? <Loader />
                            : errorOrders ? <Message variant="danger">{errorOrders}</Message>
                                : (
                                    <Table striped bordered hover responsive className="table-sm">
                                        <thead>
                                            <tr>
                                                <td>ID</td>
                                                <td>DATE</td>
                                                <td>TOTAL</td>
                                                <td>PAID</td>
                                                <td>DELIVERED</td>
                                                <td>Order Details</td>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                orders.map((order) => {
                                                    return (
                                                        <>
                                                            <tr key={order._id}>
                                                                <td>{order._id}</td>
                                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                                <td>{order.totalPrice}</td>
                                                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                                )}</td>
                                                                <td>{order.isDelivered ? order.DeliveredAt.substring(0, 10) : (
                                                                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                                )}</td>
                                                                <td>
                                                                    <LinkContainer to={`/order/${order._id}`}>
                                                                        <Button variant="light">Details</Button>
                                                                    </LinkContainer>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                )
                    }
                </Col>
            </Row>
        </>
    )
}

export default Profile;