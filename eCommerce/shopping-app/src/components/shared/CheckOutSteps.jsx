// adding breadcrum
import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
    const design = {
        background: "yellow",
        fontSize: '20px',

    }

    const active = {
        color: "#1dad14"
    }

    const notActive = {
        background: "white",
        color: "black",
    }
    return (
        <>
            <Nav className="justify-content-center mb-4" style={design}>
                <Nav.Item>
                    {step1 ? (
                        <LinkContainer to="/login">
                            <Nav.Link><span style={active}>SignIn</span></Nav.Link>
                        </LinkContainer>
                    ) : (<Nav.Link disabled style={notActive}>SignIn</Nav.Link>)}
                </Nav.Item>

                <Nav.Item>
                    {step2 ? (
                        <LinkContainer to="/shipping">
                            <Nav.Link style={active}>Shipping</Nav.Link>
                        </LinkContainer>
                    ) : (<Nav.Link disabled style={notActive}>Shipping</Nav.Link>)}
                </Nav.Item>

                <Nav.Item>
                    {step3 ? (
                        <LinkContainer to="/payment">
                            <Nav.Link style={active}>Payment</Nav.Link>
                        </LinkContainer>
                    ) : (<Nav.Link disabled style={notActive}>Payment</Nav.Link>)}
                </Nav.Item>

                <Nav.Item>
                    {step4 ? (
                        <LinkContainer to="/placeorder">
                            <Nav.Link style={active}>Place Order</Nav.Link>
                        </LinkContainer>
                    ) : (<Nav.Link disabled style={notActive}>Place Order</Nav.Link>)}
                </Nav.Item>
            </Nav>
        </>
    )
}

export default CheckOutSteps;