import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product product = {product} key = {product.id} handleAddToCart = {handleAddToCart}></Product>)
                }
            </div>
            <div className='cart-container'>
                <h2 style={{textAlign: 'center'}}>Order Summary</h2>
                <h5>Select items: {cart.length}</h5>
            </div>
        </div>
    );
};

export default Shop;