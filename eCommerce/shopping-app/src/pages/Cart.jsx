import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Form, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { addTocart, removeToCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import Message from '../components/shared/Message'

const Cart = ({ match, location, history }) => {

    const productId = match.params.id;
    // ex:- ?qty=4 split will seperate ?qty and 4 ?qty is index 0 and 4 is index 1
    // so we only need the number i.e 4
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    console.log(qty)
    console.log(productId)

    const dispatch = useDispatch();

    useEffect(() => {
        //sending the data to action file
        if (productId) {
            dispatch(addTocart(productId, qty));
        }
    }, [dispatch, productId, qty])

    // we use useSelector to store and then only we can use it in browser
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    //const { item, existItem } = cart;

    console.log(cartItems);


    const removeFromCartHandler = (id) => {
        dispatch(removeToCart(id));
    }

    const checkOut = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {
                        cartItems.length === 0 ? (
                            <Message>Your cart is empty ! <Link to="/">Go back</Link></Message>
                        ) : (<ListGroup variant="flush">
                            {
                                cartItems.map((item) => {
                                    return (
                                        <ListGroupItem>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>
                                                    ${item.price}
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addTocart(item.product_id, Number(e.target.value)))}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </Form.Control>


                                                </Col>
                                                <Col md={2}>
                                                    {/* button to remove item through its id*/}
                                                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product_id)}>
                                                        <i className="fa fa-trash text-danger" aria-hidden="true"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>)
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            {/* to get the total number of item selected from qty and
                            display together*/ }
                            <ListGroupItem>
                                <h2>Sub-Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroupItem>
                            {/* button for checkout*/}
                            <Button
                                type="button"
                                className="btn btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkOut}
                            >
                                Proceed to checkout
                            </Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Cart;