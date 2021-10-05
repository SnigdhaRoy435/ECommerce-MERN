import React from 'react';
//import products from '../product';
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";



const List = (props) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${props.id}`}>
          <Card.Img src={props.img} />
        </Link>
        <Card.Body>
          <Link to={`/product/${props.id}`}>
            <Card.Title as="div">
              <strong>{props.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating value={props.rating} text={`${props.numReview} reviews`} />
          </Card.Text>
          <Card.Text as="div">
            $ {props.price}
          </Card.Text>
          <Card.Text as="div">
            Stock:- {props.countInStock}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )

}

export default List;