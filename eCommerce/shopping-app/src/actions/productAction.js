import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILS, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_REQUEST, ADD_PRODUCT_FAILS } from '../constant/productConstant';
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILS } from '../constant/productConstant'
import axios from 'axios';
export const listProducts = () => async (dispatch) => {
    try {
        //getting the request from server
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('http://localhost:8080/api/products');
        //once the request is done then store the data to payload
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAILS,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}

export const detailsProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`http://localhost:8080/api/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILS,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}

export const addYourProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('http://localhost:8080/api/addproduct', product, config);

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data
        })

        localStorage.setItem("products", JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAILS,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}