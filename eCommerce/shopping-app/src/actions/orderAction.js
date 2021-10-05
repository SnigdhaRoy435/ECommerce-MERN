import { OREDR_CREATE_REQUEST, OREDR_CREATE_SUCCESS, OREDR_CREATE_FAIL, OREDR_DETAILS_REQUEST, OREDR_DETAILS_SUCCESS, OREDR_DETAILS_FAIL, OREDR_PAY_REQUEST, OREDR_PAY_SUCCESS, OREDR_PAY_FAIL, OREDR_LIST_MY_REQUEST, OREDR_LIST_MY_SUCCESS, OREDR_LIST_MY_FAIL } from '../constant/orderConstant';
import axios from 'axios';

export const orderCreateAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OREDR_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post('http://localhost:8080/api/order', order, config);
        dispatch({
            type: OREDR_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: OREDR_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OREDR_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                //'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`http://localhost:8080/api/order/${id}`, config);
        dispatch({
            type: OREDR_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: OREDR_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OREDR_PAY_REQUEST
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                //'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`http://localhost:8080/api/order/${orderId}/pay`, paymentResult, config);
        dispatch({
            type: OREDR_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: OREDR_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

export const listMyOrder = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: OREDR_LIST_MY_REQUEST
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                //'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`http://localhost:8080/api/order/myorders`, config);
        dispatch({
            type: OREDR_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: OREDR_LIST_MY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}