import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2'
import { ListGroup, Row, Col, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { OREDR_PAY_RESET } from '../constant/orderConstant'
import { getOrderDetails, payOrder } from '../actions/orderAction';
import { Link } from 'react-router-dom';
import Message from '../components/shared/Message';
import Loader from '../components/shared/Loader';
import axios from 'axios';

const OrderDetail = ({ match }) => {
    const orderId = match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay

    // calculate price
    if (!loading) {
        const addDecimal = (num) => {
            return Math.round(num * 100 / 100).toFixed(2);
        }

        order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult))
    }

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('http://localhost:3000/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true

            script.onload = () => {
                setSdkReady(true)
            }

            document.body.appendChild(script)
        }


        if (!order || successPay) {
            dispatch(getOrderDetails(orderId))
            dispatch({ type: OREDR_PAY_RESET })

        } else if (!order.isPaid) {
            if (window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
            }
        }


    }, [dispatch, orderId, order, successPay])

    return loading ? <Loader />
        : error ? <Message variant="danger">{error}</Message>
            : <>
                <h2>Order {order._id}</h2>
                <Row>
                    <Col md={8}>
                        <ListGroup.Item variant="flush">
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                {order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}
                                {order.shippingAddress.city}
                                {order.shippingAddress.postalCode}
                                {order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered ? <Message variant="success">{order.DeliveredAt}</Message>
                                    : <Message variant="danger">Not Delivered</Message>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                <strong> {order.paymentMethod} </strong>
                            </p>
                            {
                                order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>
                                    : <Message variant="danger">Not paid</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                order.orderItems === 0 ? (<Message variant="danger">Your cart is empty</Message>) : (
                                    <ListGroup variant="flush">
                                        {
                                            order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={5}>
                                                            {/*item.qty + " x " + "$" + item.price + " = " + "$" + order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)*/}
                                                            {item.qty + " x " + " $" + item.price} =  ${(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>{order.itemsPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>{order.shippingPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>{order.taxPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>{order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Message variant="danger">{error}</Message>}
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                        {!order.isPaid && (<ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady ? (<Loader />) : (
                                <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHandler}
                                />
                            )}
                        </ListGroup.Item>)}
                    </Col>
                </Row>

            </>
}

export default OrderDetail;