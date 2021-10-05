import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
//import data from "../product";
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap"
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { detailsProduct } from '../actions/productAction';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'
//import axios from "axios";
//import List from "./List"

const ProductDetails = ({ match }) => {
    const { params: { productId } } = match; // shortcut
    // if match id product._id and the link clicked in browser id will be same then 
    // this page will render
    // const product = data.find((p) => Number(p._id) === Number(match.params.productId));
    //const [product, setProduct] = useState([]);

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails

    useEffect(() => {
        //fetching data using useState function
        // const fetchData = async () => {
        //  const { data } = await axios.get(`http://localhost:8080/api/product/${productId}`);
        //setProduct(data);
        /* var instance = axios.create({
             headers:
                 { 'content-type': 'application/x-www-form-urlencoded' }
         });
         instance.get(`http://localhost:8080/api/product/${productId}`)
             .then((res) => {
                 setProduct(res.data)
             });*/
        // }
        // fetchData();

        //fetching data using redux
        dispatch(detailsProduct(productId))

    }, [dispatch, match])

    const history = useHistory();

    const addToCart = () => {
        history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message varient="danger" /> :
                    <div>
                        <Link className='btn btn-light my-3' to='/'>
                            <i class="fas fa-arrow-left"></i>
                            &nbsp; Go Back
                         </Link>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>{product.name}</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReview} Reviews`}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price:₹{product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>

                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price</Col>
                                            <Col>
                                                <strong>₹{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {
                                        product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCart}>
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                        </Row>
                    </div>
            }
        </>
    )
}

export default ProductDetails;