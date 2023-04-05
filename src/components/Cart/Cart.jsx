import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const removeCart = props.removeCart;
    const cart = props.cart;
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart) {
        // if(product.quantity === 0){
        //     product.quantity = 1;
        // }
        product.quantity = product.quantity || 1
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice*7/100;
    const grandTotal = totalPrice + tax + totalShipping;
   
    return (
        <div className='cart'>
            <h2 style={{ textAlign: 'center' }}>Order Summary</h2>
            <p>Select Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
            <button onClick={removeCart} className='clear-btn'> Clear Cart  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
            <button className='review-btn'>Review Order <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
        </div>
    );
};

export default Cart;