import React from 'react';
import './ReviewItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItems = ({product, handleRemoveFromCart}) => {
    const {_id, img, name, price, quantity} = product;
    return (
        <div className='review-item'>
            <img src= {img} alt="" />
            <div className='review-details'>
                <p className='product-title'>{name}</p>
                <p>Price: <span className='orange-text'>${price}</span></p>
                <p>Order Quantity: <span className='orange-text'>{quantity}</span></p>
            </div>
            <button className='btn-delete' onClick={() => handleRemoveFromCart(_id)}>
                <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}/>
            </button>
        </div>
    );
};

export default ReviewItems;