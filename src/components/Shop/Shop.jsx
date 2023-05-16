import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const { totalProducts } = useLoaderData();

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const pageNumbers = [...Array(totalPages).keys()]


    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data)
        }
        fetchData();
    }, [currentPage, itemsPerPage]);
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    let savedCart = [];
    useEffect(() => {
        const storedCart = getShoppingCart();
        // step 1: get id of the added product...
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id);
            if (addedProduct) {
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
        // const exists = cart.find(pd => pd._id === product._id);
        // if(!exists){
        //     newCart = [...cart, product]
        // }
        // else{
        //     exists.quantity = exists.quantity + 1;
        //     const remaining = cart.filter(pd => pd._id !== product._id);
        //     newCart = [...remaining, exists];
        // }
        setCart(newCart)
        addToDb(product._id)
    }
    const clearCart = () => {
        localStorage.removeItem('shopping-cart');
        setCart(savedCart)
    }

    const options = [5, 10, 20]

    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0)
    }
    return (
        <>
            <div className='shop-container'>
                <div className='products-container'>
                    {
                        products.map(product => <Product product={product} key={product._id} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
                <div className='cart-container'>
                    <Cart cart={cart} clearCart={clearCart}>
                        <Link className='review-link' to="/orders">
                            <button className='review-btn'>Review Order <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                        </Link>
                    </Cart>
                </div>
            </div>
            {/* Pagination */}

            <div className="pagination">
                <p>Current Page: {currentPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;