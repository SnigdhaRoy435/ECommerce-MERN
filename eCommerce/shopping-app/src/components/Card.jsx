import React from 'react';
//import users from './users';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image } from "react-bootstrap";

const Card = (props) => {
    return (
        <>

            <Image className="card-img-top img-fluid" src={props.imgage} alt="Card image cap" />


        </>
    );
};

export default Card;