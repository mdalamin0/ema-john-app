import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart)
    let totalPrice = 0;
    let totalShipping = 0;
    for(const product of cart) {
        totalPrice = totalPrice + product.price
        totalShipping = totalShipping + product.shipping
    }
    const tax = totalPrice*7/100;
    const grandTotal = totalPrice + tax + totalShipping;
    return (
        <div className='cart'>
            <h2 style={{ textAlign: 'center' }}>Order Summary</h2>
            <p>Select Items: {cart.length}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
        </div>
    );
};

export default Cart;