import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from 'react-bootstrap';
import { saveShippingAddress } from '../actions/cartAction';
import FormContainer from '../components/shared/FormContainer';
import CheckOutStep from '../components/shared/CheckOutSteps'

const Shipping = ({ history }) => {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!userLogin) {
            history.push('/login')
        } else {
            dispatch(saveShippingAddress({ address, city, postalCode, country }));
            history.push('/payment');
            console.log('shipping Address')
        }


    }

    return (
        <>
            <CheckOutStep step1 step2 />

            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Postal Code"
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                            required
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            required
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">Continue</Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default Shipping;