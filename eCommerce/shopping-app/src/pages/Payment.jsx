import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartAction';
import CheckOutStep from '../components/shared/CheckOutSteps'

const Payment = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping')
    }
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('paypal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');

    }

    return (
        <>
            <CheckOutStep step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <h1>Payment Method</h1>
                <Form.Group>
                    <Form.Label as="legend">
                        Select Payment Method
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            id="paypal"
                            label="paypal or credit card"
                            name="paymentMethod"
                            value='paypal' checked
                            onChange={e => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>

                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </>
    )

}

export default Payment;