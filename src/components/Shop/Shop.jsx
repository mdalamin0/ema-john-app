import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    let savedCart = [];
    useEffect(() => {
        const storedCart = getShoppingCart();
        // step 1: get id of the added product...
        for(const id in storedCart){
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        // set the cart
        setCart(savedCart)
    }, [products])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        // nicher ta aktu advanced cart a product details local storage theke set korar jonno
        // let newCart = [];
        // const exists = cart.find(pd => pd.id === product.id);
        // if(!exists){
        //     newCart = [...cart, product]
        // }
        // else{
        //     exists.quantity = exists.quantity + 1;
        //     const remaining = cart.filter(pd => pd.id !== product.id);
        //     newCart = [...remaining, exists];
        // }
        setCart(newCart)
        addToDb(product.id)
    }
    const removeCart = () => {
        localStorage.removeItem('shopping-cart');
        setCart(savedCart)
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product product={product} key={product.id} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} removeCart = {removeCart}></Cart>
            </div>
        </div>
    );
};

export default Shop;