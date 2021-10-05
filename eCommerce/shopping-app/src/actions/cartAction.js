import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constant/cartConstant";
import axios from 'axios'

//we will get two parameters from url id and qty
export const addTocart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:8080/api/product/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product_id: data._id,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            image: data.image,
            qty
        }
    })

    //to store data in our localStorage
    //getState is use to fetch data from store.js file and there only you gey cart
    // and inside cart you will find cartItems which you set at cartReducer
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

//we are using getState here because item is stored in localStorage
export const removeToCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))


}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}