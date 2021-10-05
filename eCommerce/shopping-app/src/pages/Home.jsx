import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction'
//import products from '../product';
import { Row, Col } from "react-bootstrap";
import List from "./List";
import axios from "axios";
//importing loader or spinner from component/shared/Loader.js
import Loader from '../components/shared/Loader';

// importing Alert from component/shared/Message.jsx
import Message from "../components/shared/Message"


const Home = () => {
    //const [product, setProduct] = useState([]);
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error } = productList;

    const [products, setProduct] = useState([]);

    useEffect(() => {
        //const fetchData = async () => {
        /*var instance = axios.create({
            headers:
                { 'content-type': 'application/x-www-form-urlencoded' }
        });
        instance.get(`http://localhost:8080/api/products`)
            .then((res) => {
                setProduct(res.data)
            });*/
        /*const { data } = await axios.get('http://localhost:8080/api/products');
        setProduct(data);
    }
    fetchData();*/
        // dispatch(listProducts());
        function getData() {
            axios.get('http://localhost:8080/api/products').then((res) => {
                setProduct(res.data);
                console.log(res.data)
            })
        }

        getData();


    }, [])

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message variant="danger">{error} </Message> :
                    <Row>
                        {
                            products.map((p, i) => {
                                return (
                                    <Col md={3} key={i}>
                                        <List
                                            id={p._id}
                                            name={p.name}
                                            description={p.description}
                                            img={p.image}
                                            rating={p.rating}
                                            numReview={p.numReview}
                                            price={p.price}
                                            countInStock={p.countInStock}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
            }

        </>
    )

}

export default Home;