import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction"

const Header = () => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Online Shop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="collapse navbar-collapse justify-content-end" id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i class="fas fa-shopping-cart"></i>
                                    &nbsp;Cart</Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                    <>
                                        <NavDropdown title={userInfo.name}>
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item>
                                                    Profile
                                            </NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                        </NavDropdown.Item>

                                        </NavDropdown>
                                        <LinkContainer to={`/addproduct/${userInfo._id}`}>
                                            <Nav.Link>
                                                <i class="fas fa-times"></i>
                                                &nbsp; Add Items</Nav.Link>
                                        </LinkContainer>
                                    </>

                                ) : (
                                        <LinkContainer to="/login">
                                            <Nav.Link>
                                                <i class="fas fa-user"></i>
                                                &nbsp; Signin</Nav.Link>
                                        </LinkContainer>

                                    )
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;